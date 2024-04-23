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
        // Crea algunos roles
        Rol::create([
            'nombre' => 'Administrador',
            'descripcion' => 'Rol de administrador con todos los permisos.',
        ]);

        Rol::create([
            'nombre' => 'Docente',
            'descripcion' => 'Rol de Docente con permisos limitados.',
        ]);

        // Puedes crear más roles según sea necesario

        $this->command->info('Roles creados exitosamente.');
    }
}
