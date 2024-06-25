<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDepartamentoToMateriasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('materia', function (Blueprint $table) {
            $table->string('departamento')->after('electiva'); // Añadir columna departamento
            $table->dropColumn('carrera_id'); // Eliminar columna carrera_id
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('materia', function (Blueprint $table) {
            $table->dropColumn('departamento'); // Eliminar columna departamento
            $table->unsignedBigInteger('carrera_id')->after('electiva'); // Añadir columna carrera_id
        });
    }


}
