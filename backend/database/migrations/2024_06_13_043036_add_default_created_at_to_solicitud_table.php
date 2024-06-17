<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddDefaultCreatedAtToSolicitudTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Modificar la tabla para establecer created_at con valor por defecto usando SQL puro
        DB::statement('ALTER TABLE solicitud ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Revertir los cambios realizados en up()
        DB::statement('ALTER TABLE solicitud ALTER COLUMN created_at DROP DEFAULT;');
    }
}
