<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitud;

class SolicitudController extends Controller
{
    public function index()
    {
        $solicitudes = Solicitud::all();
        return $solicitudes;
    }

    public function store(Request $request)
    {
        $solicitud = new Solicitud();
        $solicitud->user_id = $request->user_id;
        $solicitud->grupo = json_encode($request->grupo);
        $solicitud->ambiente_id = $request->ambiente_id;
        $solicitud->materia = $request->materia;
        $solicitud->horas = json_encode($request->horas);
        $solicitud->servicios = $request->servicios;
        $solicitud->detalle = $request->detalle;
        $solicitud->fecha = $request->fecha;
        $solicitud->save();

        return response()->json($solicitud, 201);
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
        $solicitud->ambiente_id = $request->ambiente_id;
        $solicitud->materia = $request->materia;
        $solicitud->horas = json_encode($request->horas);
        $solicitud->servicios = $request->servicios;
        $solicitud->detalle = $request->detalle;
        $solicitud->fecha = $request->fecha;
        $solicitud->save();

        return response()->json($solicitud, 200);
    }

    public function destroy($id)
    {
        $solicitud = Solicitud::destroy($id);
        return $solicitud;
    }
}
