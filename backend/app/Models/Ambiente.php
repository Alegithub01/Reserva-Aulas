<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ambiente extends Model
{
    use HasFactory;
    public function solicitudes()
    {
        return $this->hasMany(Solicitud::class);
    }
    protected $fillable = [
        'nombre',
        'capacidad',
        'tipo',
        'planta',
        'ubicacion',
        'servicios',
        'dia',
        'horas',       
    ];
}
