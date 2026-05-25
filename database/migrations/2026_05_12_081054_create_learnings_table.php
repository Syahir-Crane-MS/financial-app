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
        Schema::create('learnings', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->string('title')->nullable();
            $table->string('type')->nullable();
            $table->string('description')->nullable();
            $table->string('upfront_cost')->nullable();
            $table->string('impact')->nullable();
            $table->string('life_score')->nullable();
            $table->string('energy_score')->nullable();
            $table->string('pre_requisite')->nullable();
            $table->string('category')->nullable();
            $table->timestamps();
            $table->softDeletes()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('learnings');
    }
};