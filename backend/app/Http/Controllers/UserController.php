<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Retorna el ID del usuario dado su nombre.
     *
     * @param  string  $nombre
     * @return \Illuminate\Http\Response
     */
    public function obtenerIdPorNombre($nombre)
    {
        // Buscar el usuario por su nombre
        $usuario = User::where('nombres', $nombre)->first();

        // Verificar si el usuario existe
        if ($usuario) {
            // Retornar el ID del usuario encontrado
            return response()->json(['id' => $usuario->id], 200);
        } else {
            // Retornar un error si el usuario no existe
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
    }

    public function index()
    {
        $users = User::with('rol')->get();
        return response()->json($users);
    }
}
