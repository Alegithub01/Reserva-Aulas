<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitud;
use App\Models\User;
use App\Models\Reserva;
use App\Models\Rechazado;
use App\Http\Controllers\CorreoController;



class SolicitudController extends Controller
{

    protected $correoController;

    public function __construct(CorreoController $correoController)
    {
        $this->correoController = $correoController;
    }

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
            $solicitud->user_id = $usuario->id; // Asignar el ID del usuario encontrado
            $solicitud->grupo = json_encode($request->grupo);
            $solicitud->nombre_ambiente = json_encode($request->nombre_ambiente);
            $solicitud->materia = $request->materia;
            $solicitud->horas = json_encode($request->horas);
            $solicitud->servicios = $request->servicios;
            $solicitud->detalle = $request->detalle;
            $solicitud->fecha = $request->fecha;
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
        $solicitud->nombre_ambiente = json_encode($request->nombre_ambiente);
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


    public function rechazarSolicitud($id)
    {
        $solicitud = Solicitud::find($id);
        if (!$solicitud) {
            return response()->json(['error' => 'Solicitud no encontrada'], 404);
        }

        $rechazoExistente = Rechazado::where('id_solicitud', $id)->first();
        if ($rechazoExistente) {
            return response()->json(['error' => 'Esta solicitud ya ha sido rechazada'], 400);
        }

        Rechazado::create([
            'id_solicitud' => $id
        ]);

        return response()->json(['message' => 'Solicitud rechazada exitosamente'], 200);
    }


    public function aceptarSolicitud($id)
    {
        $solicitud = Solicitud::find($id);
        if (!$solicitud) {
            return response()->json(['error' => 'Solicitud no encontrada'], 404);
        }

        $usuarioId = $solicitud->user_id;

        $reservaExistente = Reserva::where('solicitud_id', $id)->first();
        if ($reservaExistente) {
            return response()->json(['error' => 'Ya existe una reserva para esta solicitud'], 400);
        }

        Reserva::create([
            'solicitud_id' => $id
        ]);

        // Obtener el correo del usuario
        $usuario = User::find($usuarioId);
        $correo = $usuario ? $usuario->email : null;
        // Enviar la notificación de reserva aceptada si se encuentra el correo del usuario
        if ($correo) {
            $this->correoController->notificarReservaAceptada($correo);
            return response()->json(['message' => 'Solicitud aceptada exitosamente'], 200);
        } else {
            return response()->json(['message' => 'Solicitud aceptada exitosamente, pero no se pudo encontrar el correo del usuario'], 200);
        }
    }



    public function dummy($id){
        return 123;
    }
}
