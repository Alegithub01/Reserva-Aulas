<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolicitud extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solicitud', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->json('grupo');
            $table->string('tipo_ambiente');
            $table->string('materia');
            $table->json('horas');
            $table->string('servicios')->nullable();
            $table->string('detalle')->nullable();
            $table->date('fecha');
            $table->integer('capacidad');
            $table->string('estado')->default('En espera');
            $table->timestamps();
    
            // Definición de las claves foráneas
            $table->foreign('user_id')->references('id')->on('users');
            
            
       
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('solicitud');
    }
}
