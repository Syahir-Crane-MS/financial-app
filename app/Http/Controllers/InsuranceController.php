<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Insurance;

class InsuranceController extends Controller
{
    public function index(){

        $insurance = Insurance::get();

        return Inertia::render('Admin/Insurance/Index', [
            'insurances' => $insurance    
        ]);
    }

    public function create(Request $request){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'monthly_contribution' => 'nullable|string',
        ]);

        $insurance = Insurance::create($validatedData);

        return redirect()->route('insurance.index')->with('success', 'Insurance created successfully.');
    }

    public function update(Request $request, $id){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'monthly_contribution' => 'nullable|string',
        ]);

        $insurance = Insurance::findOrFail($id);

        $insurance->update($validatedData);

        return redirect()->route('insurance.index')->with('success', 'Insurance updated successfully.');
    }

    public function delete($id){

    }


}