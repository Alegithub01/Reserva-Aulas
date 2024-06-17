<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ambiente;

class AmbienteSeeder extends Seeder
{
    public function run()
    {
        $ambientes = [
            [
                "nombre" => '607',
                "capacidad" => 180,
                "tipo" => 'Aula',
                "planta" => 'Planta 0',
                "ubicacion" => 'Frente al Dpto de Biologia',
                "servicios" => null,
                "dia" => 'Lunes',
                "horas" => json_encode(['11:15-12:45'])
            ],
            [
                "nombre" => '624',
                "capacidad" => 75,
                "tipo" => 'Aula',
                "planta" => 'Planta 0',
                "ubicacion" => 'Trencito',
                "servicios" => 'Data display',
                "dia" => 'Martes',
                "horas" => json_encode(['11:15-12:45,17:15-18:45'])
            ],
            [
                "nombre" => '625C',
                "capacidad" => 100,
                "tipo" => 'Aula',
                "planta" => 'Planta 1',
                "ubicacion" => 'Biblioteca',
                "servicios" => 'Data display',
                "dia" => 'Miércoles',
                "horas" => json_encode(['12:45-14:15'])
            ],
            [
                "nombre" => '693A',
                "capacidad" => 200,
                "tipo" => 'Aula',
                "planta" => 'Planta 3',
                "ubicacion" => 'Edif. Nuevo',
                "servicios" => '2 Data display',
                "dia" => 'Miércoles',
                "horas" => json_encode(['06:45-08:15,08:15-09:45'])
            ],
            [
                "nombre" => '690B',
                "capacidad" => 100,
                "tipo" => 'Aula',
                "planta" => 'Planta 0',
                "ubicacion" => 'Edif. Nuevo',
                "servicios" => null,
                "dia" => 'Miércoles',
                "horas" => json_encode(['11:15-12:45,18:45-20:15'])
            ],
            [
                "nombre" => '692C',
                "capacidad" => 180,
                "tipo" => 'Aula',
                "planta" => 'Planta 2',
                "ubicacion" => 'Edif. Nuevo',
                "servicios" => null,
                "dia" => 'Lunes',
                "horas" => json_encode(['17:15-18:45'])
            ],
            [
                "nombre" => '693C',
                "capacidad" => 175,
                "tipo" => 'Aula',
                "planta" => 'Planta 3',
                "ubicacion" => 'Edif. Nuevo',
                "servicios" => null,
                "dia" => 'Jueves',
                "horas" => json_encode(['11:15-12:45'])
            ],
            [
                "nombre" => '655',
                "capacidad" => 50,
                "tipo" => 'Aula',
                "planta" => 'Planta 0',
                "ubicacion" => 'Frente a CES',
                "servicios" => null,
                "dia" => 'Viernes',
                "horas" => json_encode(['12:45-14:15'])
            ],
            [
                "nombre" => 'LAB02',
                "capacidad" => 50,
                "tipo" => 'Laboratorio',
                "planta" => 'Planta 3',
                "ubicacion" => 'Edif. Memi',
                "servicios" => 'Computadoras',
                "dia" => 'Lunes',
                "horas" => json_encode(['11:15-12:45,18:45-20:15'])
            ],
        ];

        foreach ($ambientes as $ambiente) {
            Ambiente::create($ambiente);
        }
    }
}
