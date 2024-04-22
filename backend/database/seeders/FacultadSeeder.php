<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Facultad;

class FacultadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Facultad::create([
            "nombre"=> "Ciencias y Tecnología",
        ]);

        Facultad::create([
            "nombre"=> "Ciencias Economicas",
        ]);

        Facultad::create([
            "nombre"=> "Humanidades y Ciencias de la Educación",
        ]);

        Facultad::create([
            "nombre"=> "Ciencias Jurídicas y Políticas",
        ]);

        Facultad::create([
            "nombre"=> "Arquitectura y Ciencias del Hábitat",
        ]);

        Facultad::create([
            "nombre"=> "Ciencias Agrícolas y Pecuarias",
        ]);

        Facultad::create([
            "nombre"=> "Medicina",
        ]);
    }
}
