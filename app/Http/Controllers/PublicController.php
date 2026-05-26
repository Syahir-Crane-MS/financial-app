<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use App\Models\Income;
use App\Models\DividenStockMarket;
use App\Models\IndexFundMarket;
use App\Models\Insurance;
use App\Models\Learning;
use App\Models\RealEstate;
use App\Models\MarketList;
use App\Models\LiveEvent;

class PublicController extends Controller
{
    Public function income(){
        $data = Income::get();
        
        return Inertia::render('Public/Income', [
            'data' => $data 
        ]);
    }
    
    Public function dividen(){
        $data = DividenStockMarket::with(['list'])->get();

        return Inertia::render('Public/Dividen', [
            'data' => $data 
        ]);
    }

    Public function fund(){
        $data = IndexFundMarket::with(['list'])->get();
        return Inertia::render('Public/Fund', [
            'data' => $data 
        ]);
    }

    Public function insurance(){
        $data = Insurance::get();

        return Inertia::render('Public/Insurance', [
            'data' => $data 
        ]);
    }

    Public function learning(){
        $data = Learning::get();

        return Inertia::render('Public/Learning', [
            'data' => $data 
        ]);
    }

    Public function realestate(){
        $data = RealEstate::get();

        return Inertia::render('Public/RealEstate', [
            'data' => $data 
        ]);
    }

    Public function news(){
        $data = MarketList::get();

        return Inertia::render('Public/Market', [
            'data' => $data 
        ]);
    }

    Public function life(){
        $data = LiveEvent::get();

        return Inertia::render('Public/Life', [
            'data' => $data 
        ]);
    }
}