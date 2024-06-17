<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MateriaDocente;

class Materia_DocenteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crea algunos
        //INTRO INFORMATICA COMPARTEN TODO CON SISTEMAS
        MateriaDocente::create([
            'materia_id'=> 5,
            'docente_id'=> 1,
            'grupo'=> '2',
            'inscritos' => 150
        ]);
        MateriaDocente::create([
            'materia_id'=> 5,
            'docente_id'=> 6,
            'grupo'=> '4',
            'inscritos' => 50
        ]);
        MateriaDocente::create([
            'materia_id'=> 5,
            'docente_id'=> 4,
            'grupo'=> '10',
            'inscritos' => 80
        ]);
        MateriaDocente::create([
            'materia_id'=> 5,
            'docente_id'=> 2,
            'grupo'=> '7',
            'inscritos' => 250
        ]);
        MateriaDocente::create([
            'materia_id'=> 5,
            'docente_id'=> 7,
            'grupo'=> '5',
            'inscritos' => 158
        ]);
        MateriaDocente::create([
            'materia_id'=> 5,
            'docente_id'=> 5,
            'grupo'=> '6',
            'inscritos' => 147
        ]);
        MateriaDocente::create([
            'materia_id'=> 5,
            'docente_id'=> 5,
            'grupo'=> '1',
            'inscritos' => 45
        ]);

        //INTRO ELECTRONICA
        MateriaDocente::create([
            'materia_id'=> 125,
            'docente_id'=> 7,
            'grupo'=> '9',
            'inscritos' => 74
        ]);
        MateriaDocente::create([
            'materia_id'=> 125,
            'docente_id'=> 6,
            'grupo'=> '11',
            'inscritos' => 200
        ]);

        //ELEMENTOS INFORMATICA
        MateriaDocente::create([
            'materia_id'=> 9,
            'docente_id'=> 1,
            'grupo'=> '2',
            'inscritos' => 46
        ]);
        MateriaDocente::create([
            'materia_id'=> 9,
            'docente_id'=> 1,
            'grupo'=> '3',
            'inscritos' => 45
        ]);
        MateriaDocente::create([
            'materia_id'=> 9,
            'docente_id'=> 9,
            'grupo'=> '5',
            'inscritos' => 28
        ]);
        MateriaDocente::create([
            'materia_id'=> 9,
            'docente_id'=> 9,
            'grupo'=> '1',
            'inscritos' => 74
        ]);
        MateriaDocente::create([
            'materia_id'=> 30,
            'docente_id'=> 9,
            'grupo'=> '2',
            'inscritos' => 96
        ]);
        MateriaDocente::create([
            'materia_id'=> 11,
            'docente_id'=> 9,
            'grupo'=> '1',
            'inscritos' => 150
        ]);
        MateriaDocente::create([
            'materia_id'=> 94,
            'docente_id'=> 9,
            'grupo'=> '2',
            'inscritos' => 45
        ]);


        MateriaDocente::create([
            'materia_id'=> 22,
            'docente_id'=> 10,
            'grupo'=> '2',
            'inscritos' => 74
        ]);
        MateriaDocente::create([
            'materia_id'=> 24,
            'docente_id'=> 10,
            'grupo'=> '1',
            'inscritos' => 45
        ]);
        MateriaDocente::create([
            'materia_id'=> 94,
            'docente_id'=> 10,
            'grupo'=> '2',
            'inscritos' => 75
        ]);

        // Puedes crear más materias y docentes aquí

        $this->command->info('Materia_Docente creados exitosamente.');
    }
}
