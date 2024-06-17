<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MateriaDocente;
use App\Models\Materia;

class MateriaDocenteController extends Controller
{
    public function obtenerMateriasPorIdDocente($idDocente)
    {
        try {
            // Buscar las filas en la tabla MateriaDocente que corresponden al ID del docente
            $materiaDocente = MateriaDocente::where('docente_id', $idDocente)->get();
            
            // Extraer los ID de las materias
            $materiaIds = $materiaDocente->pluck('materia_id');

            // Obtener los nombres de las materias utilizando los ID
            $materias = Materia::whereIn('id', $materiaIds)->pluck('nombre');

            return response()->json(['materias' => $materias], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un problema al obtener las materias del docente.'], 500);
        }
    }

    public function obtenerGruposEInscritosPorIdDocenteYNombreMateria($idDocente, $nombreMateria)
    {
        try {
            // Buscar todas las filas en la tabla MateriaDocente que corresponden al ID del docente y el nombre de la materia
            $materiaDocentes = MateriaDocente::where('docente_id', $idDocente)
                                            ->whereHas('materia', function ($query) use ($nombreMateria) {
                                                $query->where('nombre', $nombreMateria);
                                            })
                                            ->get();

            $resultados = [];

            // Iterar sobre todas las filas encontradas y almacenar los grupos e inscritos en un arreglo
            foreach ($materiaDocentes as $materiaDocente) {
                $resultados[] = [
                    'grupo' => $materiaDocente->grupo,
                    'inscritos' => $materiaDocente->inscritos
                ];
            }

            return response()->json(['resultados' => $resultados], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un problema al obtener los grupos e inscritos de la materia.'], 500);
        }
    }

    public function gruposPorMateria($nombreMateria)
    {
        $nombreMateria =  str_replace('-', ' ', $nombreMateria);
        $grupos = MateriaDocente::whereHas('materia', function($query) use ($nombreMateria) {
            $query->where('nombre', $nombreMateria);
        })->pluck('grupo')->unique()->toArray();

        return $grupos;
    }

    public static function obtenerInfoPorMateria($nombreMateria)
    {
        $resultados = [];
        $nombreMateria =  str_replace('-', ' ', $nombreMateria);

        // Obtener todas las entradas de MateriaDocente relacionadas con la materia proporcionada
        $materiaDocentes = MateriaDocente::whereHas('materia', function($query) use ($nombreMateria) {
            $query->where('nombre', $nombreMateria);
        })->with('docente.user')->get();

        // Iterar sobre las entradas y extraer la información necesaria
        foreach ($materiaDocentes as $materiaDocente) {
            $grupo = $materiaDocente->grupo;
            $docente = $materiaDocente->docente;

            // Si el docente tiene un usuario relacionado
            if ($docente && $docente->user) {
                $nombreDocente = $docente->user->nombres . ' ' . $docente->user->apellidos;
                $docenteId = $docente->user->id;
            } else {
                $nombreDocente = 'Docente desconocido'; // Manejar caso donde no hay usuario relacionado
                $docenteId = null;
            }

            $inscritos = $materiaDocente->inscritos;

            // Agregar la información al arreglo de resultados
            $resultados[] = [
                'grupo' => $grupo,
                'nombre_docente' => $nombreDocente,
                'inscritos' => $inscritos,
                'docente_id' => $docenteId,
            ];
        }

        return $resultados;
    }
        
}