<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SolicitudGrupal;

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
        $solicitudGrupal->estado = $request->estado ?? $solicitudGrupal->estado; // Keep current state if not provided
        $solicitudGrupal->save();

        return response()->json($solicitudGrupal, 200);
    }

    public function destroy($id)
    {
        $solicitudGrupal = SolicitudGrupal::destroy($id);
        return response()->json(['success' => $solicitudGrupal], 200);
    }
}
