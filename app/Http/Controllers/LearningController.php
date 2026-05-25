<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;
use Auth;
use App\Models\Learning;


class LearningController extends Controller
{
    public function index(){

        $learning = Learning::get();

        return Inertia::render('Admin/Learning/Index', [
            'learnings' => $learning
        ]);
    }

    public function create(Request $request){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'type' => 'nullable|string',
            'description' => 'nullable|string',
            'upfront_cost' => 'nullable|string',
            'impact' => 'nullable|string',
            'life_score' => 'nullable|string',
            'energy_score' => 'nullable|string',
            'pre_requisite' => 'nullable|string',
            'category' => 'nullable|string',
        ]);

        $income = Learning::create($validatedData);

        return redirect()->route('learning.index')->with('success', 'Learning created successfully.');
    }

    public function update(Request $request, $id){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'type' => 'nullable|string',
            'description' => 'nullable|string',
            'upfront_cost' => 'nullable|string',
            'impact' => 'nullable|string',
            'life_score' => 'nullable|string',
            'energy_score' => 'nullable|string',
            'pre_requisite' => 'nullable|string',
            'category' => 'nullable|string',
        ]);

        $realestate = Learning::findOrFail($id);

        $realestate->update($validatedData);

        return redirect()->route('learning.index')->with('success', 'Learning updated successfully.');

    }

    public function delete($id){

    }
}