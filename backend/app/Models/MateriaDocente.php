<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MateriaDocente extends Model
{
    use HasFactory;

    protected $table = 'materia_docente';

    protected $fillable = ['materia_id', 'docente_id', 'grupo','inscritos'];

    // Relación con la tabla de Materia
    public function materia()
    {
        return $this->belongsTo(Materia::class, 'materia_id');
    }

    // Relación con la tabla de Docente
    public function docente()
    {
        return $this->belongsTo(Docente::class, 'docente_id');
    }
}
