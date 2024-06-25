<?php

namespace Database\Factories;

use App\Models\Carrera;
use Illuminate\Database\Eloquent\Factories\Factory;

class MateriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        return [
            'nivel' => $this->faker->words(),
            'nombre' => $this->faker->words(),
            'tipo' => $this->faker->words(),
            'electiva' => $this->faker->boolean(),
            'departamento' => $this->faker->words(),
        ];
    }
}
