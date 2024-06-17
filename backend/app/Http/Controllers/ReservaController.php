<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitud;
use App\Models\SolicitudGrupal;
use App\Models\Reserva;

class ReservaController extends Controller
{
    public function asignarIndividual(Request $request)
    {
        // Buscar la solicitud por su ID
        $solicitud = Solicitud::findOrFail($request->id);

        // Buscar si ya existe una reserva para esta solicitud
        $reservaExistente = Reserva::where('solicitable_id', $request->id)
                                ->where('solicitable_type', Solicitud::class)
                                ->first();

        if ($reservaExistente) {
            // Si la reserva ya existe, actualizar la asignación de aulas
            $reservaExistente->aulas = json_encode($request->aulas);
            $reservaExistente->save();
        } else {
            // Si la reserva no existe, crear una nueva reserva
            $reserva = new Reserva();
            $reserva->solicitable_id = $request->id;
            $reserva->solicitable_type = Solicitud::class;
            $reserva->aulas = json_encode($request->aulas);
            $reserva->save();
        }

        // Actualizar el estado de la solicitud
        $solicitud->estado = 'Asignada';
        $solicitud->save();

        // Devolver una respuesta exitosa
        return response(['message' => 'Aulas asignadas a las reservas'], 200);
    }

    public function asignarGrupal(Request $request)
    {
        // Buscar la solicitud grupal por su ID
        $solicitud = SolicitudGrupal::findOrFail($request->id);

        // Buscar si ya existe una reserva para esta solicitud grupal
        $reservaExistente = Reserva::where('solicitable_id', $request->id)
                                ->where('solicitable_type', SolicitudGrupal::class)
                                ->first();

        if ($reservaExistente) {
            // Si la reserva ya existe, actualizar la asignación de aulas
            $reservaExistente->aulas = json_encode($request->aulas);
            $reservaExistente->save();
        } else {
            // Si la reserva no existe, crear una nueva reserva
            $reserva = new Reserva();
            $reserva->solicitable_id = $request->id;
            $reserva->solicitable_type = SolicitudGrupal::class;
            $reserva->aulas = json_encode($request->aulas);
            $reserva->save();
        }

        // Actualizar el estado de la solicitud grupal
        $solicitud->estado = 'Asignada';
        $solicitud->save();

        // Devolver una respuesta exitosa
        return response(['message' => 'Aulas asignadas a las reservas'], 200);
    }
}
?>
