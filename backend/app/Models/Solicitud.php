<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'solicitud';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'grupo', 'tipo_ambiente', 'materia', 'horas', 'servicios', 'detalle', 'fecha', 'estado', 'capacidad'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'grupo' => 'array',
        'horas' => 'array',
        'fecha' => 'date',
    ];

    /**
     * Default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'estado' => 'En espera',
    ];

    /**
     * Get the user that owns the solicitud.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
