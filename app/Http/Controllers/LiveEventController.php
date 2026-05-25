<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;
use Auth;

class LiveEventController extends Controller
{
    public function index(Request $request){
        return Inertia::render('Admin/LifeEvent/Index', [
            
        ]);
    }
}