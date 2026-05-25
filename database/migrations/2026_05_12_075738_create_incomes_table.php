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
        Schema::create('incomes', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->string('title')->nullable();
            $table->string('income_type')->nullable();
            $table->string('market_value')->nullable();
            $table->string('valuation')->nullable();
            $table->string('loan')->nullable();
            $table->string('monthly_cf')->nullable();
            $table->string('upfront_cost')->nullable();
            $table->string('energy_score')->nullable();
            $table->string('level')->nullable();
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
        Schema::dropIfExists('incomes');
    }
};