<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class RealEstate extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'title',
        'type',
        'market_value',
        'down_payment',
        'loan',
        'monthly_cf',
        'selling_price',
        'est_cash_out',
        'category',
        'description'
    ];

    public function uniqueIds(): array
    {
        return ['uuid'];
    }
}