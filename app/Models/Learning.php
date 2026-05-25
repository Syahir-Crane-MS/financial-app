<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Learning extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'title',
        'type',
        'description',
        'upfront_cost',
        'impact',
        'life_score',
        'energy_score',
        'pre_requisite',
        'category'
    ];

    public function uniqueIds(): array
    {
        return ['uuid'];
    }
}