<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regla extends Model
{
    use HasFactory;

    /**
     * Los atributos que pueden ser asignados en masa.
     *
     * @var array
     */
    protected $fillable = ['descripcion'];

    /**
     * Crea una nueva instancia del modelo.
     *
     * @param  array  $attributes
     * @return void
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        // Verificar si se ha proporcionado una descripción
        if (isset($attributes['descripcion'])) {
            $this->descripcion = $attributes['descripcion'];
        }
    }
}
