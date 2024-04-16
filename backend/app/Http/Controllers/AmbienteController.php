<?php

namespace App\Http\Controllers;

use App\Models\Ambiente;
use Illuminate\Http\Request;

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
}
