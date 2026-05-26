<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Income;

class IncomeController extends Controller
{
    public function index(Request $request){

        $income = Income::get();

        return Inertia::render('Admin/Income/Index', [
            'incomes' => $income,
        ]);
    }

    public function create(Request $request){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'income_type' => 'nullable|string',
            'market_value' => 'nullable|string',
            'valuation' => 'nullable|string',
            'loan' => 'nullable|string',
            'monthly_cf' => 'nullable|string',
            'upfront_cost' => 'nullable|string',
            'energy_score' => 'nullable|string',
            'level' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $income = Income::create($validatedData);

        return redirect()->route('income.index')->with('success', 'Income created successfully.');
    }

    public function update(Request $request, $id){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'income_type' => 'nullable|string',
            'market_value' => 'nullable|string',
            'valuation' => 'nullable|string',
            'loan' => 'nullable|string',
            'monthly_cf' => 'nullable|string',
            'upfront_cost' => 'nullable|string',
            'energy_score' => 'nullable|string',
            'level' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $income = Income::findOrFail($id);

        $income->update($validatedData);

        return redirect()->route('income.index')->with('success', 'Income updated successfully.');

    }

    public function delete($id){

    }
}