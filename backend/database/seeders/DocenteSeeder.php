<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Docente;

class DocenteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Docente::create([
            "user_id"=> 1,
        ]);

        Docente::create([
            "user_id"=> 2,
        ]);

        Docente::create([
            "user_id"=> 3,
        ]);

        Docente::create([
            "user_id"=> 4,
        ]);

        Docente::create([
            "user_id"=> 5,
        ]);

        Docente::create([
            "user_id"=> 6,
        ]);

        Docente::create([
            "user_id"=> 7,
        ]);

        Docente::create([
            "user_id"=> 8,
        ]);

        Docente::create([
            "user_id"=> 9,
        ]);

        Docente::create([
            "user_id"=> 10,
        ]);
    }
}