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
        ]);
        MateriaDocente::create([
            'materia_id'=> 5,
            'docente_id'=> 6,
            'grupo'=> '4',
        ]);
        MateriaDocente::create([
            'materia_id'=> 5,
            'docente_id'=> 4,
            'grupo'=> '10',
        ]);
        MateriaDocente::create([
            'materia_id'=> 5,
            'docente_id'=> 2,
            'grupo'=> '7',
        ]);
        MateriaDocente::create([
            'materia_id'=> 5,
            'docente_id'=> 7,
            'grupo'=> '5',
        ]);
        MateriaDocente::create([
            'materia_id'=> 5,
            'docente_id'=> 5,
            'grupo'=> '6',
        ]);
        MateriaDocente::create([
            'materia_id'=> 5,
            'docente_id'=> 5,
            'grupo'=> '1',
        ]);

        //INTRO ELECTRONICA
        MateriaDocente::create([
            'materia_id'=> 125,
            'docente_id'=> 7,
            'grupo'=> '9',
        ]);
        MateriaDocente::create([
            'materia_id'=> 125,
            'docente_id'=> 6,
            'grupo'=> '11',
        ]);

        //ELEMENTOS INFORMATICA
        MateriaDocente::create([
            'materia_id'=> 9,
            'docente_id'=> 1,
            'grupo'=> '2',
        ]);
        MateriaDocente::create([
            'materia_id'=> 9,
            'docente_id'=> 1,
            'grupo'=> '3',
        ]);
        MateriaDocente::create([
            'materia_id'=> 9,
            'docente_id'=> 9,
            'grupo'=> '5',
        ]);
        MateriaDocente::create([
            'materia_id'=> 9,
            'docente_id'=> 9,
            'grupo'=> '1',
        ]);
        MateriaDocente::create([
            'materia_id'=> 30,
            'docente_id'=> 9,
            'grupo'=> '2',
        ]);
        MateriaDocente::create([
            'materia_id'=> 11,
            'docente_id'=> 9,
            'grupo'=> '1',
        ]);
        MateriaDocente::create([
            'materia_id'=> 94,
            'docente_id'=> 9,
            'grupo'=> '2',
        ]);


        MateriaDocente::create([
            'materia_id'=> 22,
            'docente_id'=> 10,
            'grupo'=> '2',
        ]);
        MateriaDocente::create([
            'materia_id'=> 24,
            'docente_id'=> 10,
            'grupo'=> '1',
        ]);
        MateriaDocente::create([
            'materia_id'=> 94,
            'docente_id'=> 10,
            'grupo'=> '2',
        ]);

        // Puedes crear más materias y docentes aquí

        $this->command->info('Materia_Docente creados exitosamente.');
    }
}
