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
        $solicitud = Solicitud::findOrFail($request->id);

        $reserva = new Reserva();
        $reserva->solicitable_id = $request->id;
        $reserva->solicitable_type = Solicitud::class;
        $reserva->aulas = json_encode($request->aulas);

        $reserva->save();
        $solicitud->estado = 'Asignada';
        $solicitud->save();

        return response(['message' => 'Aulas asignadas a las reservas'], 200);
    }

    public function asignarGrupal(Request $request)
    {
        $solicitud = SolicitudGrupal::findOrFail($request->id);

        $reserva = new Reserva();
        $reserva->solicitable_id = $request->id;
        $reserva->solicitable_type = SolicitudGrupal::class;
        $reserva->aulas = json_encode($request->aulas);

        $reserva->save();
        $solicitud->estado = 'Asignada';
        $solicitud->save();

        return response(['message' => 'Aulas asignadas a las reservas'], 200);
    }
}
?>
