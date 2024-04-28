<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailNotify;

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
    public function notificarCambioReglas() {

        $datos =
            [
                'subject' => 'Notificación de Cambio de Reglas',
                'body' => 'La regla para las solicitudes de reservas ha sido modificada y publicadas, por favor ten en consideración este cambio para hacer uso del Sistema'
            ];

        try {
            Mail::to('mateovaldivia3000@gmail.com')->send(new MailNotify($datos));

            return response()->json(['message' => 'Correo enviado'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al enviar el correo'], 400);
        }
    }
}
