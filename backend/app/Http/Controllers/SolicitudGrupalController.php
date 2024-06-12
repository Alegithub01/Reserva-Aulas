<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SolicitudGrupal;
use App\Models\Reserva;

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
        $solicitudGrupal->users_id = json_encode($request->users_id);
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
        $solicitudGrupal->users_id = json_encode($request->users_id);
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

        if ($solicitud_g->estado === 'aceptada') {
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
        $solicitud_g->estado = 'Asignación rechazada';
        $solicitud_g->save();
        return response()->json(['message' => 'Asignación rechazada por el docente'], 200);
    }

    public function solicitudesAceptadasGrupal()
    {
        // Obtener todas las solicitudes aceptadas
        $solicitudes = SolicitudGrupal::where('estado', 'Aceptada')->get();

        // Preparar un array para almacenar la información formateada
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
}
