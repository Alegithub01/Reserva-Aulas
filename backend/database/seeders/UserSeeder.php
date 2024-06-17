<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            "rol_id" => 2,
            "nombres" => 'Maria Leticia',
            "apellidos" => 'Blanco Coca',
            "email" => 'eurekasolutionsrl@gmail.com',  /**para la prueba */
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => 2,
            "nombres" => 'Corina Justina',
            "apellidos" => 'Flores Villaroel',
            "email" => 'prueba@gmail.com',  
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => 2,
            "nombres" => 'Gonzalo',
            "apellidos" => 'Salinas Pericon',
            "email" => 'prueba2@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => 2,
            "nombres" => 'Vladimir',
            "apellidos" => 'Costas Jauregui',
            "email" => 'prueba3@gmail.com',  
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => 2,
            "nombres" => 'Carla',
            "apellidos" => 'Salazar Serrudo',
            "email" => 'prueba4@gmail.com',  
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => 2,
            "nombres" => 'Henrry Frank',
            "apellidos" => 'Villaroel Tapia',
            "email" => 'prueba6@gmail.com',  
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => 2,
            "nombres" => 'Victor Hugo',
            "apellidos" => 'Montaño Quiroga',
            "email" => 'prueba5@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);
        User::create([
            "rol_id" => 2,
            "nombres" => 'Kurt Ronaldo',
            "apellidos" => 'Jaldin Rosales',
            "email" => 'prueba7@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);
        User::create([
            "rol_id" => 2,
            "nombres" => 'Rosemary',
            "apellidos" => 'Torrico Bascope',
            "email" => 'prueba8@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);
        User::create([
            "rol_id" => 2,
            "nombres" => 'Tatiana',
            "apellidos" => 'Aparicio Yuja',
            "email" => 'prueba9@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => 2,
            "nombres" => 'Marco Antonio',
            "apellidos" => 'Montecinos Choque',
            "email" => 'prueba10@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => 2,
            "nombres" => 'Marcelo',
            "apellidos" => 'Antezana Choque',
            "email" => 'prueba11@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => 2,
            "nombres" => 'Ramiro',
            "apellidos" => 'Valdez Marañon',
            "email" => 'prueba12@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => 1,
            "nombres" => 'Umss',
            "apellidos" => 'FCYT',
            "email" => 'admin@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);
    }
}
