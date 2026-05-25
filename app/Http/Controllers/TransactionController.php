<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transactions;
use App\Models\UserEvent;
use Inertia\Inertia;
use Auth;

class TransactionController extends Controller
{
    public function create(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'session_id'  => 'required',
            'invest_uuid' => 'required',
            'invest_type' => 'required',
        ]);

        $event = UserEvent::find($validatedData['session_id']);

        if (!$event) {
            return redirect()->back()->withErrors(['error' => 'Error Please Try Again']);
        }

        $isDuplicate = Transactions::where('user_id', $user->id)
            ->where('session_id', $validatedData['session_id'])
            ->where('invest_uuid', $validatedData['invest_uuid'])
            ->exists();

        if ($isDuplicate) {
            return redirect()->back()->with([
                'error' => 'You have already purchased this item!'
            ]);
        }

        $userEvent = Transactions::create([
            'event_id'    => $event->event_id,
            'session_id'  => $validatedData['session_id'],
            'invest_uuid' => $validatedData['invest_uuid'],
            'invest_type' => $validatedData['invest_type'],
            'user_id'     => $user->id,
        ]);

        return redirect()
            ->route('myevent.view', [$userEvent->session_id])
            ->with('success', 'Success Purchased!');
    }

    public function viewAll($id){
        $user = Auth::user();

        $transaction = Transactions::where('user_id','=',$user->id)
        ->where('session_id','=', $id)
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

        return Inertia::render('User/MyEvent/Expense', [
            'transactions' => $transaction,
            'session_id' => $id
        ]);
    }

    public function viewIncome($id){
        $user = Auth::user();

        $transaction = Transactions::where('user_id','=',$user->id)
        ->where('session_id','=', $id)
        ->where('invest_type','=','income')
        ->with([
            'income',      
            ])->get();

        return Inertia::render('User/MyEvent/Invest/Income', [
            'transactions' => $transaction,
            'session_id' => $id
        ]);
    }

    public function viewStock($id){
        $user = Auth::user();

        $transaction = Transactions::where('user_id','=',$user->id)
        ->where('session_id','=', $id)
        ->where('invest_type','=','dividen_stock')
        ->with([
            'stock',      
            ])->get();

        return Inertia::render('User/MyEvent/Invest/Stock', [
            'transactions' => $transaction,
            'session_id' => $id
        ]);
    }

    public function viewFund($id){
        $user = Auth::user();

        $transaction = Transactions::where('user_id','=',$user->id)
        ->where('session_id','=', $id)
        ->where('invest_type','=','index_fund')
        ->with([
            'fund',      
            ])->get();

        return Inertia::render('User/MyEvent/Invest/Fund', [
            'transactions' => $transaction,
            'session_id' => $id
        ]);
    }

    public function viewInsurance($id){
        $user = Auth::user();

        $transaction = Transactions::where('user_id','=',$user->id)
        ->where('session_id','=', $id)
        ->where('invest_type','=','insurance')
        ->with([
            'insurance',      
            ])->get();

        return Inertia::render('User/MyEvent/Invest/Insurance', [
            'transactions' => $transaction,
            'session_id' => $id
        ]);
    }

    public function viewLearning($id){
        $user = Auth::user();

        $transaction = Transactions::where('user_id','=',$user->id)
        ->where('session_id','=', $id)
        ->where('invest_type','=','learning')
        ->with([
            'learning',      
            ])->get();

        return Inertia::render('User/MyEvent/Invest/Learning', [
            'transactions' => $transaction,
            'session_id' => $id
        ]);
    }

    public function viewLife($id){
        $user = Auth::user();

        $transaction = Transactions::where('user_id','=',$user->id)
        ->where('session_id','=', $id)
        ->where('invest_type','=','life')
        ->with([
            'life',      
            ])->get();

        return Inertia::render('User/MyEvent/Invest/Life', [
            'transactions' => $transaction,
            'session_id' => $id
        ]);
    }

    public function viewMarket($id){
        $user = Auth::user();

        $transaction = Transactions::where('user_id','=',$user->id)
        ->where('session_id','=', $id)
        ->where('invest_type','=','market')
        ->with([
            'market',      
            ])->get();

        return Inertia::render('User/MyEvent/Invest/Market', [
            'transactions' => $transaction,
            'session_id' => $id
        ]);
    }

    public function viewRealEstate($id){
        $user = Auth::user();

        $transaction = Transactions::where('user_id','=',$user->id)
        ->where('session_id','=', $id)
        ->where('invest_type','=','real_estate')
        ->with([
            'realestate',      
            ])->get();

        return Inertia::render('User/MyEvent/Invest/RealEstate', [
            'transactions' => $transaction,
            'session_id' => $id
        ]);
    }
}