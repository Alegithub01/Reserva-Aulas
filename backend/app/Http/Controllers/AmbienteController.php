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
}