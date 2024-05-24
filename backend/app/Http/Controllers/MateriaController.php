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
}