<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DividenStockMarketList extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'dividen_id',
        'direction',
        'magnitude'
    ];
}