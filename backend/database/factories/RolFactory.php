<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RolFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        
        $nombre = $this->faker->unique()->word();
        $descripcion = $this->faker->sentence();
        
        return [
            'nombre' => $nombre,
            'descripcion' => $descripcion,
        ];
    }
}
