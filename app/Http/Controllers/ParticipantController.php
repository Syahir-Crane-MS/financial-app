<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\UserEvent;
use App\Models\Transactions;

class ParticipantController extends Controller
{
    public function index(Request $request){

        $user = User::where('role','=','user')->get();

        return Inertia::render('Admin/User/Index', [
            'users' => $user    
        ]);
    }

    public function view($id){

        $session = UserEvent::where('user_id','=', $id)->with(['event'])->get();
        $user = User::where('id',$id)->first();

        return Inertia::render('Admin/User/View', [
            'sessions' => $session,
            'users' => $user
        ]);
    }

    public function session($id, $sid){

        $user = User::where('id',$id)->first();

        $session = UserEvent::where("id",$sid)->with(['event'])->first();

        $transaction = Transactions::where("user_id","=",$id)
        ->where("session_id","=",$sid)
        ->with([
            'income',
            'stock',
            'fund',
            'insurance',
            'learning',
            'life',
            'market',
            'realestate',
            'user'
            ])->get();

        return Inertia::render('Admin/User/Session', [
            'user' => $user,
            'session' => $session,
            'transactions' => $transaction,
        ]);
    }

    public function transaction($id, $sid, $tid){

    }
}