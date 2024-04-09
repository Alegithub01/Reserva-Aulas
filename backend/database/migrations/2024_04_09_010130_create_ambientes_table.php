<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAmbientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ambientes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 255);
            $table->integer('capacidad');
            $table->string('tipo', 255);
            $table->string('planta', 255);
            $table->string('ubicacion')->nullable(); // Permite valores nulos
            $table->string('servicios')->nullable(); // Permite valores nulos
            $table->string('dia')->nullable();;
            $table->json('horas')->nullable();;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ambientes');
    }
}