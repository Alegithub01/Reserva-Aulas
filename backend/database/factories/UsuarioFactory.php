<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Rol;
class UsuarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $rolId = Rol::all()->random()->id ?? Rol::factory()->create()->id;
        return [
            'idRol' => $rolId, 
            'correoElectronico' => $this->faker->unique()->safeEmail(),
            'contrasenia' => bcrypt('password123'), // Ejemplo de contraseña encriptada (cámbialo según sea necesario)
            'nombres' => $this->faker->firstName(),
            'apellidoP' => $this->faker->lastName(),
            'apellidoM' => $this->faker->lastName(),
            'estado' => $this->faker->randomElement(['habilitado', 'deshabilitado']), // Aleatoriamente selecciona 'habilitado' o 'deshabilitado'
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
