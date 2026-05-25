<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventSession extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'active',
        'passcode',
        'initial_salary'
    ];
}