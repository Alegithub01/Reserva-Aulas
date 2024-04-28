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
            "rol_id" => null,
            "nombres" => 'Maria Leticia',
            "apellidos" => 'Blanco Coca',
            "email" => 'eurekasolutionsrl@gmail.com',  /**para la prueba */
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => null,
            "nombres" => 'Corina Justina',
            "apellidos" => 'Flores Villaroel',
            "email" => 'prueba@gmail.com',  
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => null,
            "nombres" => 'Gonzalo',
            "apellidos" => 'Salinas Pericon',
            "email" => 'prueba2@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => null,
            "nombres" => 'Vladimir',
            "apellidos" => 'Costas Jauregui',
            "email" => 'prueba3@gmail.com',  
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => null,
            "nombres" => 'Carla',
            "apellidos" => 'Salazar Serrudo',
            "email" => 'prueba4@gmail.com',  
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => null,
            "nombres" => 'Henrry Frank',
            "apellidos" => 'Villaroel Tapia',
            "email" => 'prueba6@gmail.com',  
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);

        User::create([
            "rol_id" => null,
            "nombres" => 'Victor Hugo',
            "apellidos" => 'Montaño Quiroga',
            "email" => 'prueba5@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);
        User::create([
            "rol_id" => null,
            "nombres" => 'Kurt Ronaldo',
            "apellidos" => 'Jaldin Rosales',
            "email" => 'prueba7@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);
        User::create([
            "rol_id" => null,
            "nombres" => 'Rosemary',
            "apellidos" => 'Torrico Bascope',
            "email" => 'prueba8@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);
        User::create([
            "rol_id" => null,
            "nombres" => 'Tatiana',
            "apellidos" => 'Aparicio Yuja',
            "email" => 'prueba9@gmail.com', 
            "password" => bcrypt('qwerty123'),
            "estado" => "habilitado"
        ]);
    }
}
