<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;
use Auth;
use App\Models\EventSession;
use App\Models\UserEvent;
use App\Models\Transactions;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    public function index(){

        $event = EventSession::get();
        
        return Inertia::render('Admin/EventSession/Index', [
            'events' => $event
        ]);
    }

    public function create(Request $request){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'active' => 'required|string',
            'passcode' => 'required|string',
            'initial_salary' => 'required|string',
        ]);

        $event = EventSession::create($validatedData);

        return redirect()->route('event.index')->with('success', 'Event created successfully.');
    }

    public function update(Request $request, $id){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'active' => 'required|string',
            'passcode' => 'required|string',
            'initial_salary' => 'required|string',
        ]);

        $income = EventSession::findOrFail($id);

        $income->update($validatedData);

        return redirect()->route('event.index')->with('success', 'Event updated successfully.');

    }

    public function updateStatus(Request $request, $id){
        $validatedData = $request->validate([
            'active' => 'required|string',
        ]);

        $income = EventSession::findOrFail($id);

        $income->update($validatedData);

        return redirect()->route('event.index')->with('success', 'Event Status Updated successfully.');
    }

    public function eventList(){
        $event = EventSession::where('active','=','true')->get();
        
        return Inertia::render('User/EventList/Index', [
            'events' => $event
        ]);
    }

    public function participants($id){
        $event = EventSession::where('id','=',$id)->first();
        $participants = UserEvent::where('event_id', $id)
            ->with(['user'])
            ->get()
            ->map(function ($event) {
                if (!$event->user) {
                    return null;
                }

                $user = $event->user;
                $user->session_id = $event->id; 
                return $user;
            })
            ->filter() 
            ->values();

        return Inertia::render('Admin/EventSession/Participants', [
            'event' => $event,
            'participants' => $participants
        ]);

    }

    public function participantSession($id, $pid, $sid){

        $event = EventSession::where('id',$id)->first();
        $user = User::where('id',$pid)->first();

        $transaction = Transactions::where('event_id','=',$id)
        ->where('user_id','=',$pid)
        ->where('session_id','=', $sid)
        ->with([
            'income',
            'stock',
            'fund',
            'insurance',
            'learning',
            'life',
            'market',
            'realestate' 
        ])->get();

        return Inertia::render('Admin/EventSession/Session', [
            'transactions' => $transaction,
            'user' => $user,
            'event' => $event
        ]);
    }

    public function reset($id)
    {
        try {
            DB::transaction(function () use ($id) {
                UserEvent::where('event_id', $id)->delete();
                Transactions::where('event_id', $id)->delete();
            });

            return redirect()->back()->with('success', 'Event successfully reset and data archived!');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to reset event: ' . $e->getMessage()]);
        }
    }

}