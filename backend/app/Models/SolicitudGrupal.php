<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolicitudGrupal extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'solicitud_grupal';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'int';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'users_id', 'grupos', 'tipo_ambiente', 'materia', 'horas', 'servicios', 'detalle', 'fecha', 'estado', 'capacidad'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'users_id' => 'array',
        'grupos' => 'array',
        'tipo_ambiente' => 'array',
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

    public function reservas()
    {
        return $this->morphMany(Reserva::class, 'solicitable');
    }
}
