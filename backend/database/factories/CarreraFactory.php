<?php

namespace Database\Factories;

use App\Models\Carrera;
use App\Models\Facultad;
use Illuminate\Database\Eloquent\Factories\Factory;

class CarreraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->word(),
            'facultad_id' => Facultad::factory(),
        ];
    }
}
