<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRoleToRolesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('roles', function (Blueprint $table) {
            $table->string('role'); // Add the role column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('roles', function (Blueprint $table) {
            $table->dropColumn('role'); // Remove the role column
        });
    }
}
