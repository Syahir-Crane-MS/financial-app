<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dividen_stock_market_lists', function (Blueprint $table) {
            $table->id();
            $table->string('dividen_id')->nullable();
            $table->string('direction')->nullable();
            $table->string('magnitude')->nullable();
            $table->timestamps();
            $table->softDeletes()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dividen_stock_market_lists');
    }
};