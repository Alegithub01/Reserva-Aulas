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
            $table->unsignedBigInteger('ambiente_id');
            $table->string('materia');
            $table->json('horas');
            $table->string('servicios')->nullable();
            $table->string('detalle')->nullable();
            $table->date('fecha');
            $table->timestamps();
    
            // Definición de las claves foráneas
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('ambiente_id')->references('id')->on('ambientes');
            //$table->foreign('materia_id')->references('id')->on('materia');
       
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
