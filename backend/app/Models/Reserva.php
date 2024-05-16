<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $table = 'reserva';

    protected $fillable = [
        'solicitud_id',
    ];


    use HasFactory;

    public function solicitud()
    {
        return $this->belongsTo(Solicitud::class);
    }
}

