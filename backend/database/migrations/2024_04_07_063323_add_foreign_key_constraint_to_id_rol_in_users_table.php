<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddForeignKeyConstraintToIdRolInUsersTable extends Migration
{
    public function up()
    {
        DB::statement('ALTER TABLE users ADD CONSTRAINT fk_idRol FOREIGN KEY (idRol) REFERENCES rols(id)');
    }

    public function down()
    {
        DB::statement('ALTER TABLE users DROP FOREIGN KEY fk_idRol');
    }
}

