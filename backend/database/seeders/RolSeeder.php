<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rol;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crea roles con IDs específicos
        Rol::create([
            'id' => 1,
            'nombre' => 'Administrador',
            'descripcion' => 'Rol de administrador con todos los permisos.',
        ]);

        Rol::create([
            'id' => 2,
            'nombre' => 'Docente',
            'descripcion' => 'Rol de Docente con permisos limitados.',
        ]);

        // Puedes crear más roles con IDs específicos según sea necesario

        $this->command->info('Roles creados exitosamente con IDs específicos.');
    }
}

