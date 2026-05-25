<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class LiveEvent extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'trajectory',
        'category',
        'title',
        'description',
        'impact',
        'life_score',
    ];

    public function uniqueIds(): array
    {
        return ['uuid'];
    }
}