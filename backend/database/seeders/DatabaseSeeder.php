<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolSeeder::class); // Llama al seeder de roles primero
        $this->call(UsuarioSeeder::class); // Llama al seeder de usuarios después de los roles
    }
}
