<?php

namespace Database\Seeders;

use App\Models\Carrera;
use Illuminate\Database\Seeder;

class CarreraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Carrera::create([
            "nombre" => "Ingeniería Civil",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Ingeniería De Alimentos",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Ingeniería De Sistemas",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Ingeniería Eléctrica",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Ingeniería Electrónica",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Ingeniería Electromecánica",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Ingeniería Industrial",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Ingeniería en Informática",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Ingeniería Matemática",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Ingeniería Mecánica",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Ingeniería Química",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Programa de Ingeniería en Biotecnología",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Licenciatura en Biología",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Licenciatura en Didáctica de la Física",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Licenciatura en Didáctica de la Matemática",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Licenciatura en Física",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Licenciatura en Matemáticas",
            "facultad_id" => 1,
        ]);
        
        Carrera::create([
            "nombre" => "Licenciatura en Química",
            "facultad_id" => 1,
        ]);
        
    }
}
