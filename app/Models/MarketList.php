<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class MarketList extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'market_climate',
        'title',
        'description',
        'sub_description',
        'impact',
        'life_score',
    ];

    public function uniqueIds(): array
    {
        return ['uuid'];
    }
}