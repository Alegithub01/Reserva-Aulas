<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;
use App\Models\Rol; // Asegúrate de importar el modelo Rol

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rol = Rol::first(); 
        // Verifica si se encontró un rol
        if ($rol) {
            // Crea 10 usuarios asociados al rol existente
            Usuario::factory()->count(10)->create([
                'idRol' => $rol->id, // Asigna el id del rol a cada usuario creado
            ]);
        } else {
            // Si no se encuentra un rol, muestra un mensaje de error
            $this->command->error('No se encontró ningún rol en la base de datos.');
        }
    }
}
