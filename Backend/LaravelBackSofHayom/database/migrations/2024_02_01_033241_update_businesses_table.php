<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateBusinessesTable extends Migration
{
    public function up()
    {
        Schema::table('businesses', function (Blueprint $table) {
            // Remove the 'auth_token' column
            $table->dropColumn('auth_token');

            // Add 'user_id' foreign key
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade'); // Adjust the onDelete behavior as needed
        });
    }

    public function down()
    {
        Schema::table('businesses', function (Blueprint $table) {
            // If you ever need to rollback, you can recreate the 'auth_token' column
            $table->string('auth_token', 255)->nullable();

            // Remove the 'user_id' foreign key
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
}
