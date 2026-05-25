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
        Schema::create('real_estates', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->string('title')->nullable();
            $table->string('type')->nullable();
            $table->string('market_value')->nullable();
            $table->string('down_payment')->nullable();
            $table->string('loan')->nullable();
            $table->string('monthly_cf')->nullable();
            $table->string('selling_price')->nullable();
            $table->string('est_cash_out')->nullable();
            $table->string('category')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
            $table->softDeletes()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('real_estates');
    }
};