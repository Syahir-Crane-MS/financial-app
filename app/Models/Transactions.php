<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Transactions extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'event_id',
        'user_id',
        'session_id',
        'invest_uuid',
        'invest_type'
    ];

    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    public function income(){
        return $this->belongsTo(Income::class, 'invest_uuid', 'uuid');
    }

    public function stock(){
        return $this->belongsTo(DividenStockMarket::class, 'invest_uuid', 'uuid');
    }

    public function fund(){
        return $this->belongsTo(IndexFundMarket::class, 'invest_uuid', 'uuid');
    }

    public function insurance(){
        return $this->belongsTo(Insurance::class, 'invest_uuid', 'uuid');
    }

    public function learning(){
        return $this->belongsTo(Learning::class, 'invest_uuid', 'uuid');
    }

    public function life(){
        return $this->belongsTo(LiveEvent::class, 'invest_uuid', 'uuid');
    }

    public function market(){
        return $this->belongsTo(MarketList::class, 'invest_uuid', 'uuid');
    }

    public function realestate(){
        return $this->belongsTo(RealEstate::class, 'invest_uuid', 'uuid');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function event(){
        return $this->belongsTo(EventSession::class, 'event_id', 'id');
    }

}