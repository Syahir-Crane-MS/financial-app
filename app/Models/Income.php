<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Income extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'title',
        'income_type',
        'market_value',
        'valuation',
        'loan',
        'monthly_cf',
        'upfront_cost',
        'energy_score',
        'level',
        'description'
    ];

    public function uniqueIds(): array
    {
        return ['uuid'];
    }
}