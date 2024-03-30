<?php

namespace App\Http\Controllers;

use App\Models\Ambiente;
use Illuminate\Http\Request;

class AmbienteController extends Controller
{
    public function index()
    {
        $ambientes = Ambiente::all();
        return response()->json($ambientes);
    }

    public function show($id)
    {
        $ambiente = Ambiente::findOrFail($id);
        return response()->json($ambiente);
    }

    public function store(Request $request)
    {
        $request->validate([
            'capacidad' => 'required|integer',
            'ubicacion' => 'required|string',
            'descripcion' => 'nullable|string',
        ]);

        $ambiente = Ambiente::create($request->all());
        return response()->json($ambiente, 201);
    }
    public function update(Request $request, $id)
    {
        $ambiente = Ambiente::findOrFail($id);

        $request->validate([
            'capacidad' => 'integer',
            'ubicacion' => 'string',
            'descripcion' => 'nullable|string',
        ]);

        $ambiente->update($request->all());
        return response()->json($ambiente, 200);
    }
    public function destroy($id)
    {
        $ambiente = Ambiente::findOrFail($id);
        $ambiente->delete();
        return response()->json(null, 204);
    }
}