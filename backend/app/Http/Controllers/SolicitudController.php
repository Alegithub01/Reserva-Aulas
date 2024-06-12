<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitud;
use App\Models\User;
use App\Models\Reserva;



class SolicitudController extends Controller
{
    public function index()
    {
        $solicitudes = Solicitud::all();
        return $solicitudes;
    }

    public function store(Request $request)
    {
        // Buscar el usuario por su nombre
        $usuario = User::where('nombres', $request->nombre_usuario)->first();


        // Verificar si el usuario existe
        if ($usuario) {
            $solicitud = new Solicitud();
            $solicitud->user_id = $usuario->id; 
            $solicitud->grupo = json_encode($request->grupo);
            $solicitud->tipo_ambiente = $request->tipo_ambiente;
            $solicitud->materia = $request->materia;
            $solicitud->horas = json_encode($request->horas);
            $solicitud->servicios = $request->servicios;
            $solicitud->detalle = $request->detalle;
            $solicitud->fecha = $request->fecha;
            $solicitud->capacidad = $request->capacidad;
            $solicitud->save();

            return response()->json($solicitud, 201);
        } else {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
    }

    public function show($id)
    {
        $solicitud = Solicitud::find($id);
        return $solicitud;
    }

    public function update(Request $request, $id)
    {
        $solicitud = Solicitud::findOrFail($id);
        $solicitud->user_id = $request->user_id;
        $solicitud->grupo = json_encode($request->grupo);
        $solicitud->tipo_ambiente = $request->tipo_ambiente;
        $solicitud->materia = $request->materia;
        $solicitud->horas = json_encode($request->horas);
        $solicitud->servicios = $request->servicios;
        $solicitud->detalle = $request->detalle;
        $solicitud->fecha = $request->fecha;
        $solicitud->capacidad = $request->capacidad;
        $solicitud->save();

        return response()->json($solicitud, 200);
    }

    public function destroy($id)
    {
        $solicitud = Solicitud::destroy($id);
        return $solicitud;
    }


    public function aceptar($id)
    {
        $solicitud = Solicitud::findOrFail($id);

        if ($solicitud->estado === 'Aceptada') {
            return response()->json(['error' => 'La solicitud ya ha sido aceptada'], 400);
        }

        $solicitud->estado = 'Aceptada';
        $solicitud->save();

        return response()->json(['message' => 'Solicitud aceptada'], 200);
    }

    public function solicitudesAceptadas()
    {
        // Obtener todas las solicitudes aceptadas
        $solicitudes = Solicitud::where('estado', 'Aceptada')->get();

        // Preparar un array para almacenar la información formateada
        $resultado = [];

        foreach ($solicitudes as $solicitud) {
            // Buscar la reserva correspondiente a la solicitud
            $reserva = Reserva::where('solicitable_id', $solicitud->id)
                            ->where('solicitable_type', Solicitud::class)
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

    public function getSolicitudesFormatted($userId)
    {
        // Obtener las solicitudes del usuario especificado
        $solicitudes = Solicitud::with(['user', 'reservas'])
                                ->where('user_id', $userId)
                                ->get();
        
        // Formatear las solicitudes
        $formattedSolicitudes = $solicitudes->map(function ($solicitud) {
            $ambientes = $solicitud->reservas->pluck('aulas')->implode(', ');

            // Decode the 'horas' JSON string to an array if it's not already an array
            $horas = is_array($solicitud->horas) ? $solicitud->horas : json_decode($solicitud->horas, true);

            return [
                'id' => $solicitud->id,
                'nombre' => $solicitud->user->nombres . ' ' . $solicitud->user->apellidos,
                'materia' => $solicitud->materia,
                'grupo' => is_array($solicitud->grupo) ? implode(', ', $solicitud->grupo) : $solicitud->grupo,
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

    public function rechazar($id)
    {
        $solicitud = Solicitud::findOrFail($id);

        $solicitud->estado = 'Rechazada';
        $solicitud->save();

        return response()->json(['message' => 'Solicitud rechazada'], 200);
    }

    public function noAceptarAsignacion($id)
    {
        $solicitud = Solicitud::findOrFail($id);

        $solicitud->estado = 'Asignación rechazada';
        $solicitud->save();

        return response()->json(['message' => 'Asignación rechazada por el docente'], 200);
    }
}
