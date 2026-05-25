<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;
use Auth;
use App\Models\RealEstate;

class RealEstateController extends Controller
{
    public function index(){

        $realEstate = RealEstate::get();

        return Inertia::render('Admin/RealEstate/Index', [
            'realestates' => $realEstate
        ]);
    }

    public function create(Request $request){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'type' => 'nullable|string',
            'market_value' => 'nullable|string',
            'down_payment' => 'nullable|string',
            'loan' => 'nullable|string',
            'monthly_cf' => 'nullable|string',
            'selling_price' => 'nullable|string',
            'est_cash_out' => 'nullable|string',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $income = RealEstate::create($validatedData);

        return redirect()->route('realestate.index')->with('success', 'Real Estate created successfully.');
    }

    public function update(Request $request, $id){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'type' => 'nullable|string',
            'market_value' => 'nullable|string',
            'down_payment' => 'nullable|string',
            'loan' => 'nullable|string',
            'monthly_cf' => 'nullable|string',
            'selling_price' => 'nullable|string',
            'est_cash_out' => 'nullable|string',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $realestate = RealEstate::findOrFail($id);

        $realestate->update($validatedData);

        return redirect()->route('realestate.index')->with('success', 'Real Estate updated successfully.');

    }

    public function delete($id){

    }


}