<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;
use Auth;
use App\Models\EventSession;
use App\Models\User;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $userCount = User::where('role', 'user')->count(); 

        $activeEventCount = EventSession::where('active', 'true')->count();

        $inactiveEventCount = EventSession::where('active', 'false')->count();

        return Inertia::render('Admin/Dashboard/Index', [
            'users_count'          => $userCount,
            'active_event_count'   => $activeEventCount,
            'inactive_event_count' => $inactiveEventCount,
        ]);
    }

    public function home(){
        
        return Inertia::render('User/Dashboard/Index',[

        ]);
    }
}