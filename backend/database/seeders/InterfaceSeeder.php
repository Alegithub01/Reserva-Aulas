<?php

namespace Database\Seeders;

use App\Models\InterfaceModel;
use Illuminate\Database\Seeder;

class InterfaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        InterfaceModel::create([
            'nombre' => 'Gestión de Usuario',
        ]);

        InterfaceModel::create([
            'nombre' => 'Gestión de Reservas',
        ]);

        InterfaceModel::create([
            'nombre' => 'Gestión de Ambientes',
        ]);

        InterfaceModel::create([
            'nombre' => 'Solicitud de Reservas',
        ]);
    }
}
