<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;
use Auth;
use App\Models\EventSession;
use App\Models\User;

use App\Models\Income;
use App\Models\IndexFundMarket;
use App\Models\DividenStockMarket;
use App\Models\Insurance;
use App\Models\Learning;
use App\Models\RealEstate;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $userCount = User::where('role', 'user')->count(); 

        $activeEventCount = EventSession::where('active', 'true')->count();
        $inactiveEventCount = EventSession::where('active', 'false')->count();

        $income = Income::get()->count();
        $index = IndexFundMarket::get()->count();
        $dividen = DividenStockMarket::get()->count();
        $insurance = Insurance::get()->count();
        $learning = Learning::get()->count();
        $realestate = RealEstate::get()->count();
        $life = 0;
        $market = 0;

        $data = [
            'life' => $life,
            'market' => $market,
            'income' => $income,
            'index' => $index,
            'dividen' => $dividen,
            'insurance' => $insurance,
            'learning' => $learning,
            'realestate' => $realestate
            ];



        return Inertia::render('Admin/Dashboard/Index', [
            'users_count'          => $userCount,
            'active_event_count'   => $activeEventCount,
            'inactive_event_count' => $inactiveEventCount,
            'data' => $data
        ]);
    }

    public function home(){
        
        return Inertia::render('User/Dashboard/Index',[

        ]);
    }
}