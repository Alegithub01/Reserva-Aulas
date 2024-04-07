<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ChangeIdColumnTypeInRolesTable extends Migration
{
    public function up()
    {
        DB::statement('ALTER TABLE rols MODIFY id INT UNSIGNED');
        DB::statement('ALTER TABLE users MODIFY id INT UNSIGNED');
        DB::statement('ALTER TABLE users MODIFY idRol INT UNSIGNED');
    }

    public function down()
    {
        DB::statement('ALTER TABLE rols MODIFY id INT');
        DB::statement('ALTER TABLE users MODIFY id INT');
        DB::statement('ALTER TABLE users MODIFY idRol INT');
    }
}

