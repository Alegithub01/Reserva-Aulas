<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Materia;

class MateriaController extends Controller
{
    public function getNombres()
    {
        $nombres = Materia::pluck('nombre')->toArray();
        return response()->json($nombres);
    }

    public function obtenerMateriasPorDepartamento($departamento)
    {
        try {
            $materias = Materia::where('departamento', $departamento)->get();
            return response()->json(['materias' => $materias], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un problema al obtener las materias.'], 500);
        }
    }
}