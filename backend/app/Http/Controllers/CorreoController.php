<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailNotify;

class CorreoController extends Controller
{
    public function index (){
        $data = [
            'subject' => 'Correo de prueba',
            'body' => 'Este es un correo de prueba'
        ];

        try {
            Mail::to('mateovaldivia3000@gmail.com')->send(new MailNotify($data));
            return response()->json(['message' => 'Correo enviado'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al enviar el correo'], 400);
        }
    }

}
