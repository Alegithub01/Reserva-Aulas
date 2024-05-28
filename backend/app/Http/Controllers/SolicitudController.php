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

        if ($solicitud->estado === 'aceptada') {
            return response()->json(['error' => 'La solicitud ya ha sido aceptada'], 400);
        }

        $reserva = new Reserva();
        $reserva->solicitable_id = $solicitud->id;
        $reserva->solicitable_type = Solicitud::class;

        $reserva->save();

        $solicitud->estado = 'aceptada';
        $solicitud->save();

        return response()->json(['message' => 'Solicitud aceptada exitosamente'], 200);
    }

    public function solicitudesAceptadas()
    {
        $solicitudes = Solicitud::where('estado', 'aceptada')->get();
        return $solicitudes;
    }

}
