<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SolicitudGrupal;
use App\Models\Reserva;
use Illuminate\Support\Facades\DB;

class SolicitudGrupalController extends Controller
{
    public function index()
    {
        $solicitudes = SolicitudGrupal::all();
        return response()->json($solicitudes, 200);
    }

    public function store(Request $request)
    {
        $solicitudGrupal = new SolicitudGrupal();
        $solicitudGrupal->users_id = $request->users_id;
        $solicitudGrupal->grupos = json_encode($request->grupos);
        $solicitudGrupal->tipo_ambiente = $request->tipo_ambiente;
        $solicitudGrupal->materia = $request->materia;
        $solicitudGrupal->horas = json_encode($request->horas);
        $solicitudGrupal->servicios = $request->servicios;
        $solicitudGrupal->detalle = $request->detalle;
        $solicitudGrupal->fecha = $request->fecha;
        $solicitudGrupal->capacidad = $request->capacidad;
        $solicitudGrupal->estado = $request->estado ?? 'En espera'; // Default to 'En espera' if not provided
        $solicitudGrupal->save();

        return response()->json($solicitudGrupal, 201);
    }

    public function show($id)
    {
        $solicitudGrupal = SolicitudGrupal::find($id);
        return response()->json($solicitudGrupal, 200);
    }

    public function update(Request $request, $id)
    {
        $solicitudGrupal = SolicitudGrupal::findOrFail($id);
        $solicitudGrupal->users_id = $request->users_id;
        $solicitudGrupal->grupos = json_encode($request->grupos);
        $solicitudGrupal->tipo_ambiente = $request->tipo_ambiente;
        $solicitudGrupal->materia = $request->materia;
        $solicitudGrupal->horas = json_encode($request->horas);
        $solicitudGrupal->servicios = $request->servicios;
        $solicitudGrupal->detalle = $request->detalle;
        $solicitudGrupal->fecha = $request->fecha;
        $solicitudGrupal->capacidad = $request->capacidad;
        $solicitudGrupal->estado = $request->estado ?? $solicitudGrupal->estado; // Keep current state if not provided
        $solicitudGrupal->save();

        return response()->json($solicitudGrupal, 200);
    }

    public function destroy($id)
    {
        $solicitudGrupal = SolicitudGrupal::destroy($id);
        return response()->json(['success' => $solicitudGrupal], 200);
    }

    public function aceptarGrupal($id)
    {
        $solicitud_g = SolicitudGrupal::findOrFail($id);

        if ($solicitud_g->estado === 'Aceptada') {
            return response()->json(['error' => 'La solicitud ya ha sido aceptada'], 400);
        }

        $solicitud_g->estado = 'Aceptada';
        $solicitud_g->save();

        return response()->json(['message' => 'Solicitud aceptada'], 200);
    }
    public function rechazarGrupal($id)
    {
        $solicitud_g = SolicitudGrupal::findOrFail($id);
        $solicitud_g->estado = 'Rechazada';
        $solicitud_g->save();
        return response()->json(['message' => 'Solicitud rechazada'], 200);
    }

    public function noAceptarAsignacionGrupal($id)
    {
        $solicitud_g = SolicitudGrupal::findOrFail($id);
        if ($solicitud_g->estado === 'Asignada') {
            $solicitud_g->estado = 'Asignación rechazada';
            $solicitud_g->save();
            return response()->json(['message' => 'Asignación rechazada por el docente'], 200);
        }
        return response()->json(['error' => 'La solicitud aun no tiene aulas asignadas'], 400);
        
    }
    
    public function solicitudesAceptadasGrupal()
    {
        $solicitudes = SolicitudGrupal::where('estado', 'Aceptada')->get();
        $resultado = [];

        foreach ($solicitudes as $solicitud) {
            // Buscar la reserva correspondiente a la solicitud
            $reserva = Reserva::where('solicitable_id', $solicitud->id)
                            ->where('solicitable_type', SolicitudGrupal::class)
                            ->first();

            // Añadir la información de la solicitud y la reserva al array de resultados
            $resultado[] = [
                'fecha' => $solicitud->fecha->format('Y-m-d'),
                'horario' => $solicitud->horas, // Asumiendo que la solicitud tiene un campo 'horas'
                'ambiente' => $solicitud->tipo_ambiente,
                'aulas' => $reserva ? json_decode($reserva->aulas) : null, // Decodificar las aulas si hay reserva
            ];
        }

        // Devolver la información formateada
        return response()->json($resultado, 200);
    }

    public function getSolicitudesGrupalesFormatted($numero)
    {
        
        $solicitudes = SolicitudGrupal::with('reservas')
                        ->whereRaw("CONCAT('-', users_id, '-') LIKE '%-$numero-%'")
                        ->get();

        // Formatear las solicitudes
        $formattedSolicitudes = $solicitudes->map(function ($solicitud) {
            $ambientes = $solicitud->reservas->pluck('aulas')->implode(', ');

            // Decodificar el JSON 'horas' a un array si no es ya un array
            $horas = is_array($solicitud->horas) ? $solicitud->horas : json_decode($solicitud->horas, true);

            return [
                'id' => $solicitud->id,
                'nombre' => 'Solicitud Grupal',
                'materia' => $solicitud->materia,
                'grupos' => is_array($solicitud->grupos) ? implode(', ', $solicitud->grupos) : $solicitud->grupos,
                'fecha' => $solicitud->fecha->format('Y-m-d'),
                'horario' => $this->formatearHoras($horas),
                'servicios' => $solicitud->servicios,
                'Motivo' => $solicitud->detalle,
                'estado' => ucfirst($solicitud->estado),
                'ambiente' => $ambientes,
            ];
        });

        // Devolver la respuesta en formato JSON
        return response()->json($formattedSolicitudes, 200);
    }

    private function formatearHoras($horas)
    {
        $horarios = [
            "10" => "06:45-08:15",
            "20" => "08:15-09:45",
            "30" => "09:45-11:15",
            "40" => "11:15-12:45",
            "50" => "12:45-14:15",
            "60" => "14:15-15:45",
            "70" => "15:45-17:15",
            "80" => "17:15-18:45",
            "90" => "18:45-20:15",
            "100" => "20:15-21:45",
        ];

        return implode(', ', array_map(function($hora) use ($horarios) {
            return $horarios[$hora] ?? $hora;
        }, $horas));
    }

    public function solicitudesAceptadasGrupalInforme()
{
    $solicitudes = SolicitudGrupal::where('estado', 'Aceptada')->get();
    $resultado = [];

    foreach ($solicitudes as $solicitud) {
        // Buscar la reserva correspondiente a la solicitud
        $reserva = Reserva::where('solicitable_id', $solicitud->id)
                        ->where('solicitable_type', SolicitudGrupal::class)
                        ->first();

        // Añadir la información de la solicitud y la reserva al array de resultados
        $resultado[] = [
            'id' => $solicitud->id,
            'user_id' => $solicitud->user_id,
            'grupo' => $solicitud->grupo ? json_decode($solicitud->grupo) : [], // Decodificar el grupo si existe
            'nombre_ambiente' => ['nombre' => $reserva ? json_decode($reserva->aulas)[0] : null], // Obtener el primer elemento de 'aulas' y decodificarlo
            'materia' => $solicitud->materia,
            'horas' => json_decode($solicitud->horas), // Asumiendo que la solicitud tiene un campo 'horas' en formato JSON
            'servicios' => $solicitud->servicios,
            'detalle' => $solicitud->detalle,
            'fecha' => $solicitud->fecha->format('Y-m-d'),
            'created_at' => $solicitud->created_at->toDateTimeString(),
            'updated_at' => $solicitud->updated_at->toDateTimeString(),
        ];
    }

    // Devolver la información formateada
    return response()->json($resultado, 200);
}

}