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
        MateriaDocente::create([
            'materia_id'=> 1,
            'docente_id'=> 5,
            'grupo'=> '1',
        ]);

        MateriaDocente::create([
            'materia_id'=> 2,
            'docente_id'=> 5,
            'grupo'=> '1',
        ]);

        // Puedes crear más materias y docentes aquí

        $this->command->info('Materia_Docente creados exitosamente.');
    }
}
