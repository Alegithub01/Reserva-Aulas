<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    protected $table = 'solicitud';

    protected $fillable = [
        'user_id', 
        'grupo', 
        'ambiente', 
        'materia', 
        'horas', 
        'servicios', 
        'detalle', 
        'fecha'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ambiente()
    {
        return $this->belongsTo(Ambiente::class);
    }
}
