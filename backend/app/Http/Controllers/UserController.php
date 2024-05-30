<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\RolController;

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

    public function obtenerNombrePorId($id)
    {
        // Buscar el usuario por su ID
        $usuario = User::find($id);

        // Verificar si el usuario existe
        if ($usuario) {
            // Retornar el nombre del usuario encontrado
            return response()->json(['nombre' => $usuario->nombres], 200);
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

    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Actualiza los campos necesarios
        $user->rol_id = $request->input('rol_id');
        $user->nombres = $request->input('nombres');
        $user->apellidos = $request->input('apellidos');
        $user->email = $request->input('email');
        $user->estado = $request->input('estado');

        try {
            $user->save();
            return response()->json(['message' => 'User updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating user', 'error' => $e->getMessage()], 500);
        }
    }

    public function disableUser($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->estado = 'Deshabilitado';
            $user->save();

            return response()->json($user);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }
}
