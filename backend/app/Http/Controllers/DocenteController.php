<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use Illuminate\Http\Request;

class DocenteController extends Controller
{
    /**
     * Devuelve el id del docente dado un user_id.
     *
     * @param  int  $user_id
     * @return int|string
     */
    public function getDocenteIdByUserId($user_id)
    {
        $docente = Docente::where('user_id', $user_id)->first();
        if (!$docente) {
            return response('Docente no encontrado', 404);
        }
        return response()->json(['id' => $docente->id], 200);
    }
}
