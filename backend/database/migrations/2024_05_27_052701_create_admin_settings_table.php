<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admin_settings', function (Blueprint $table) {
            $table->id();
            $table->integer('nroMaxPeriodAuditorio');
            $table->integer('nroMaxPeriodAula');
            $table->integer('nroMaxPeriodLaboratorio');
            $table->date('FechaIniSolicitudes');
            $table->date('FechaFinSolicitudes');
            $table->integer('NroMaxAmbientContiguos');
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
        Schema::dropIfExists('admin_settings');
    }
}
