<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolicitudGrupalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solicitud_grupal', function (Blueprint $table) {
            $table->id()->startingValue(100001);
            $table->text('users_id');
            $table->json('grupos');
            $table->json('tipo_ambiente');
            $table->string('materia', 255);
            $table->json('horas');
            $table->string('servicios', 255)->nullable();
            $table->string('detalle', 255)->nullable();
            $table->date('fecha');
            $table->integer('capacidad');
            $table->string('estado', 255)->default('En espera');
            $table->timestamps(); // This line includes both created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('solicitud_grupal');
    }
}
