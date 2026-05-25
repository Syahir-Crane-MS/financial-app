<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Arr;
use App\Models\DividenStockMarket;
use App\Models\DividenStockMarketList;

class DividenStockMarketController extends Controller
{
    public function index(){

        $stock = DividenStockMarket::get();

        return Inertia::render('Admin/DividenStock/Index', [
            'stocks' => $stock
        ]);
    }

    public function create(Request $request){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'current_stock_price' => 'nullable|string',
            'dividen_per_share' => 'nullable|string',
        ]);

        $stock = DividenStockMarket::create($validatedData);

        return redirect()->route('dividen.index')->with('success', 'Stock created successfully.');
    }

    public function view($id){
        $stock = DividenStockMarket::find($id);

        $list = DividenStockMarketList::where('dividen_id','=',$id)->get();

        return Inertia::render('Admin/DividenStock/View', [
            'stocks' => $stock,
            'lists' => $list
        ]);
    }

    public function update(Request $request, $id){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'current_stock_price' => 'nullable|string',
            'dividen_per_share' => 'nullable|string',
        ]);

        $stock = DividenStockMarket::findOrFail($id);

        $stock->update($validatedData);

        return redirect()->route('dividen.index')->with('success', 'Dividen Stock updated successfully.');

    }

    public function generateData($id)
    {
        DividenStockMarketList::where('dividen_id', $id)->delete();

        $dataToInsert = [];

        for ($i = 0; $i < 50; $i++) {
            $dataToInsert[] = [
                'dividen_id'    => $id,
                'direction'  => Arr::random(['positive', 'negative']), 
                'magnitude'  => rand(5, 15), 
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DividenStockMarketList::insert($dataToInsert);

        return redirect()->back()->with('success', '50 data generated!');
    }


}