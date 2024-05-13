<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'reserva';

    use HasFactory;

    public function solicitud()
    {
        return $this->belongsTo(Solicitud::class);
    }
}

