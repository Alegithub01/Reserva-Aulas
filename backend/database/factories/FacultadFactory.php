<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FacultadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $nombre = $this->faker->unique()->word();

        return [
            'nombre' => $nombre,
        ];
    }
}
