<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailNotify;
use App\Models\User;

class CorreoController extends Controller
{
    public function index(Request $request) {
        $request->validate([
            'subject' => 'required|string',
            'body' => 'required|string'
        ]);

        $datos = $request->only(['subject', 'body']);

        try {
            Mail::to('mateovaldivia3000@gmail.com')->send(new MailNotify($datos));

            return response()->json(['message' => 'Correo enviado'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al enviar el correo'], 400);
        }
    }

    public function notificarCambioReglas(){
        // Obtener todos los correos electrónicos de los usuarios
        $emails = User::pluck('email');

        // Datos del correo electrónico
        $datos = [
            'subject' => 'Notificación de Cambio de Reglas',
            'body' => 'La regla para las solicitudes de reservas ha sido modificada y publicadas, por favor ten en consideración este cambio para hacer uso del Sistema'
        ];

        try {
            // Iterar sobre cada correo electrónico y enviar el correo
            foreach ($emails as $email) {
                Mail::to($email)->send(new MailNotify($datos));
            }

            // Retornar una respuesta exitosa
            return response()->json(['message' => 'Correo enviado a todos los usuarios'], 200);
        } catch (\Exception $e) {
            // Retornar una respuesta de error en caso de excepción
            return response()->json(['message' => 'Error al enviar el correo'], 400);
        }
    }

    public function notificarReservaAceptada($email){
        // Datos del correo electrónico
        $datos = [
            'subject' => 'Reserva Aceptada',
            'body' => 'Tu reserva ha sido aceptada, por favor revisa el estado de tu solicitud en el Sistema'
        ];

        try {
            // Enviar el correo electrónico
            Mail::to($email)->send(new MailNotify($datos));

            // Retornar una respuesta exitosa
            return response()->json(['message' => 'Correo enviado'], 200);
        } catch (\Exception $e) {
            // Retornar una respuesta de error en caso de excepción
            return response()->json(['message' => 'Error al enviar el correo'], 400);
        }
    }

    public function notificarSolicitudRechazada($email){
        // Datos del correo electrónico
        $datos = [
            'subject' => 'Solicitud Rechazada',
            'body' => 'Tu solicitud ha sido rechazada, por favor revisa el estado de tu solicitud en el Sistema'
        ];

        try {
            // Enviar el correo electrónico
            Mail::to($email)->send(new MailNotify($datos));

            // Retornar una respuesta exitosa
            return response()->json(['message' => 'Correo enviado'], 200);
        } catch (\Exception $e) {
            // Retornar una respuesta de error en caso de excepción
            return response()->json(['message' => 'Error al enviar el correo'], 400);
        }
    }

}
