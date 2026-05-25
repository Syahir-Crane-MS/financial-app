<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IndexFundMarketList extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'fund_id',
        'direction',
        'magnitude'
    ];
}