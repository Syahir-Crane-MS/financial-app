<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\EventSession;
use App\Models\UserEvent;
use App\Models\DividenStockMarket;
use App\Models\Income;
use App\Models\IndexFundMarket;
use App\Models\Insurance;
use App\Models\Learning;
use App\Models\LiveEvent;
use App\Models\MarketList;
use App\Models\RealEstate;


class UserEventController extends Controller
{
    
    public function eventList(){
        $user = Auth::user();

        $event = UserEvent::where("user_id","=",$user->id)->with(['event'])->get();

        return Inertia::render('User/MyEvent/Index', [
            'events' => $event
        ]);
    }


    public function create(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'event_id' => 'required',
            'passcode' => 'required|string',
        ]);

        $event = EventSession::find($validatedData['event_id']);

        if (!$event) {
            return redirect()->back()->with('error', 'Event invalid');
        }

        if ($validatedData['passcode'] === $event->passcode) {
            
            $alreadyRegistered = UserEvent::where('user_id', $user->id)
                ->where('event_id', $event->id)
                ->exists();

            if ($alreadyRegistered) {
                return redirect()->back()->with('error', 'You Already Registered');
            }

            $userEvent = UserEvent::create([
                'event_id' => $event->id,
                'user_id'  => $user->id,
                'status'   => 'active',
            ]);

            return redirect()->route('myevent.view',[$userEvent->id])->with('success', 'Success Register!');
        }

        return redirect()->back()->with('error', 'Wrong Passcode');
    }

    public function view($id){

        $session = UserEvent::where("id",$id)->with(['event'])->first();

        return Inertia::render('User/MyEvent/View', [
            'sessions' => $session
        ]);
    }

    public function scanner($id){
        return Inertia::render('User/MyEvent/Scanner', [
            'id' => $id
        ]);
    }

    public function result(Request $request, $id){
        $scannedCode = $request->query('code');

        if (!$scannedCode || !Str::isUuid($scannedCode)) {
            return Inertia::render('User/MyEvent/Error', [
                'id'    => $id,
                'error' => 'Error QR Code'
            ]);
        }

        $models = [
            'dividen_stock' => DividenStockMarket::class,
            'income'        => Income::class,
            'index_fund'    => IndexFundMarket::class,
            'insurance'     => Insurance::class,
            'learning'      => Learning::class,
            'live_event'    => LiveEvent::class,
            'market_list'   => MarketList::class,
            'real_estate'   => RealEstate::class,
        ];

        $scannedData = null;
        $modelType = null;

        foreach ($models as $key => $modelClass) {
            $record = $modelClass::where('uuid', $scannedCode)->first();

            if ($record) {
                $scannedData = $record;
                $modelType = $key;
                break; 
            }
        }

        if (!$scannedCode || !$scannedData) {
            $error = 'Error QR Code';

            return Inertia::render('User/MyEvent/Error', [
                'id' => $id,
                'error' => $error
            ]);
        }

        return Inertia::render('User/MyEvent/Result', [
            'id' => $id,
            'scanned_code' => $scannedCode,
            'model_type'   => $modelType,   
            'result_data'  => $scannedData,
        ]);
    }

    public function expense($id){
        return Inertia::render('User/MyEvent/Expense', [
            'id' => $id
        ]);
    }


}