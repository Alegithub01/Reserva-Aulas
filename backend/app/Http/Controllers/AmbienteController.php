<?php

namespace App\Http\Controllers;

use App\Models\Ambiente;
use Illuminate\Http\Request;

use App\Models\Regla;

use Illuminate\Support\Facades\Log;


class AmbienteController extends Controller
{
    public function index()
    {
        $ambientes = Ambiente::all();
        return $ambientes;
    }

    public function store(Request $request)
    {
        $ambiente = new Ambiente();
        $ambiente->nombre = $request->nombre;
        $ambiente->capacidad = $request->capacidad;
        $ambiente->tipo = $request->tipo;
        $ambiente->planta = $request->planta;
        $ambiente->ubicacion = $request->ubicacion;
        $ambiente->servicios = $request->servicios;
        $ambiente->dia = $request->dia;
        $ambiente->horas = json_encode($request->horas);

        $ambiente->save();

        return response()->json($ambiente, 201);
    }

    public function show($id)
    {
        $ambiente = Ambiente::find($id);
        return $ambiente;
    }

    public function update(Request $request, $id)
    {
        $ambiente = Ambiente::findOrFail($id);

        $ambiente->nombre = $request->nombre;
        $ambiente->capacidad = $request->capacidad;
        $ambiente->tipo = $request->tipo;
        $ambiente->planta = $request->planta;
        $ambiente->ubicacion = $request->ubicacion;
        $ambiente->servicios = $request->servicios;
        $ambiente->dia = $request->dia;
        $ambiente->horas = json_encode($request->horas);

        $ambiente->save();

        return $ambiente;
    }

    public function destroy($id)
    {
        $ambiente = Ambiente::destroy($id);
        return $ambiente;
    }

    public function importar(Request $request)
    {
        \Log::info('Datos recibidos en la importación:', $request->all());
        $request->validate([
            'registros' => 'required|array',
        ]);

        $registrosImportados = $request->registros;

        foreach ($registrosImportados as $registroImportado) {

            if (isset($registroImportado['nombre'], $registroImportado['capacidad'], $registroImportado['tipo'], $registroImportado['planta'])) {
                $ambienteData = [
                    'nombre' => $registroImportado['nombre'],
                    'capacidad' => $registroImportado['capacidad'],
                    'tipo' => $registroImportado['tipo'],
                    'planta' => $registroImportado['planta'],
                    'ubicacion' => $registroImportado['ubicacion'] ?? null,
                    'servicios' => $registroImportado['servicios'] ?? null,
                    'dia' => $registroImportado['dia'] ?? null,
                    'horas' => isset($registroImportado['horas']) ? json_encode($registroImportado['horas']) : null,
                ];


                Ambiente::create(array_filter($ambienteData));
            }
        }



        return response()->json(['message' => 'Los ambientes se importaron correctamente'], 200);
    }

    public function addRule(Request $request)
    {
        // Validar si el JSON contiene el atributo 'newRule'
        if ($request->has('newRule')) {
            // Obtener el valor del atributo 'newRule' del JSON
            $newRule = $request->input('newRule');
            // retonarn el newRule

            // Crear una nueva instancia de la regla con la descripción recibida
            $regla = new Regla(['descripcion' => $newRule]);

            // Guardar la nueva regla en la base de datos
            $regla->save();

            // Devolver una respuesta JSON indicando que la regla ha sido creada
            return response()->json(['message' => 'Nueva regla creada con descripción: ' . $newRule]);
        } else {
            // Devolver una respuesta de error si el JSON no contiene 'newRule'
            return response()->json(['error' => 'El atributo newRule es requerido'], 400);
        }
    }


    public function getRules()
    {
        // Obtener todas las reglas de la base de datos
        $reglas = Regla::all();

        // Devolver las reglas en formato JSON
        return response()->json($reglas);
    }


    #filtros 
    public function filtrar(Request $request)
    {
        Log::debug('Datos recibidos en la solicitud: ' . json_encode($request->all()));

        $query = Ambiente::query();

        // Verificar si se ha proporcionado el filtro por capacidad y si no es nulo
        if ($request->filled('capacidad')) {
            $capacidad = (int)$request->capacidad;
            $query->where('capacidad', '>=', $capacidad);
        }

        // Verificar si se ha proporcionado el filtro por tipo
        if ($request->has('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        if ($request->has('servicios')) {
        $servicios = $request->servicios;
        $query->where(function($q) use ($servicios) {
            $q->whereIn('servicios', explode(',', $servicios));
        });
    }

        // Verificar si se ha proporcionado el filtro por día
        if ($request->has('dia')) {
            $query->where('dia', $request->dia);
        }

        //Verificar si se ha proporcionado el filtro por hora 
        if ($request->has('horas')) {
            $horas = $request->horas;
            $query->whereRaw("jsonb_exists_any(horas::jsonb, ARRAY['$horas'])");
        }

        $resultados = $query->get();
        Log::debug('Resultado de la consulta: ' . $resultados->toJson());
        return response()->json($resultados);
    }

}
