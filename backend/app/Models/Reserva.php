<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $table = 'reserva'; // Especifica la tabla personalizada si es necesario

    protected $fillable = [
        'solicitable_id',
        'solicitable_type',
        'aulas',
    ];

    // Relación polimórfica
    public function solicitable()
    {
        return $this->morphTo();
    }
}
