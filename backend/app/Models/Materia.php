<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    use HasFactory;
    protected $table = 'materia';
    protected $fillable = [
        'nivel',
        'nombre',
        'tipo',
        'electiva',
        'departamento', 
    ];

    public function docentes()
    {
        return $this->belongsToMany(Docente::class, 'materia_docente');
    }
}
