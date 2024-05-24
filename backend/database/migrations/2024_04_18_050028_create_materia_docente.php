<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMateriaDocente extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('materia_docente', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('materia_id');
            $table->unsignedBigInteger('docente_id');
            $table->string('grupo');
            $table->integer('inscritos');
            $table->timestamps();

            // Definir las claves foráneas
            $table->foreign('materia_id')->references('id')->on('materia')->onDelete('cascade');
            $table->foreign('docente_id')->references('id')->on('docente')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('materia_docente');
    }
}
