<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MarketListContoller extends Controller
{
    public function index(Request $request){
        return Inertia::render('Admin/MarketNews/Index', [
            
        ]);
    }
}