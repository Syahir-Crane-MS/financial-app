<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class DividenStockMarket extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'title',
        'current_stock_price',
        'dividen_per_share'
    ];

    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    public function list(){
        return $this->hasMany(DividenStockMarketList::class, 'dividen_id', 'id');
    }
}