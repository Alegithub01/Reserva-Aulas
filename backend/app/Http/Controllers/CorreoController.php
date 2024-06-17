<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailNotify;
use App\Models\User;
use App\Models\Solicitud;

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

    // recibiré un json con un arreglo de correos electrónicos y un mensaje
    public function notificarSolicitud(Request $request){
        $request->validate([
            'subject' => 'required|string',
            'content' => 'required|string',
            'receptores' => 'required|array',
            'tipoCorreo' => 'required|string',
            'idSolicitud' => 'required|integer'
        ]);
        $tipo = $request->tipoCorreo;
        $idSoli = $request->idSolicitud;
        // ahora buscar la Soliciutd segun el id
        //$solicitud = Solicitud::findOrFail($idSoli);
        // actualizar estado en la base de datos
        //$solicitud->estado = $tipo;
        //$solicitud->save();

        $datos = $request->only(['subject', 'content', 'receptores']);
        $emails = $this->getEmailsFromReceptores($datos['receptores']);
        $datos2 = [
            'subject' => $datos['subject'],
            'body' => $datos['content']
        ];

        try {
            foreach ($emails as $email) {
                Mail::to($email)->send(new MailNotify($datos2));
            }

            return response()->json(['message' => 'Correo enviado a los usuarios seleccionados'], 200);
        } catch (\Exception $e) {
            return $e;
        }

    }

    private function getEmailsFromReceptores(array $receptores)
    {
        $emails = [];

        foreach ($receptores as $receptor) {
            $nombreCompleto = explode(' ', $receptor);
            $apellidos = array_slice($nombreCompleto, -2, 2);// arryslice corta el array desde la -2 posicon dos posiciones
            $nombres = array_slice($nombreCompleto, 0, count($nombreCompleto) - 2);// corta el array desde la posicion 0 hasta la cantidad de elementos -2
            $nombres = implode(' ', $nombres); // implode convierte un array en un string
            $apellidos = implode(' ', $apellidos); // implode convierte un array en un string

            $user = User::where('nombres', $nombres)->where('apellidos', $apellidos)->first();
            if ($user) {
                $emails[] = $user->email;
            }
        }

        return $emails;
    }
}
