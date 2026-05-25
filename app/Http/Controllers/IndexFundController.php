<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Arr;
use App\Models\IndexFundMarket;
use App\Models\IndexFundMarketList;


class IndexFundController extends Controller
{
    public function index(){

        $fund = IndexFundMarket::get();

        return Inertia::render('Admin/IndexFund/Index', [
            'funds' => $fund
        ]);
    }

    public function create(Request $request){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'current_fund_price' => 'nullable|string',
        ]);

        $fund = IndexFundMarket::create($validatedData);

        return redirect()->route('fund.index')->with('success', 'Fund created successfully.');
    }
    
    public function view($id){
        $fund = IndexFundMarket::find($id);

        $list = IndexFundMarketList::where('fund_id','=',$id)->get();

        return Inertia::render('Admin/IndexFund/View', [
            'funds' => $fund,
            'lists' => $list
        ]);
    }

    public function update(Request $request, $id){
        $validatedData = $request->validate([
            'title' => 'required|string',
            'current_fund_price' => 'nullable|string',
        ]);

        $fund = IndexFundMarket::findOrFail($id);

        $fund->update($validatedData);

        return redirect()->route('fund.index')->with('success', 'Fund updated successfully.');

    }

    public function delete($id){

    }

    public function generateData($id)
    {
        IndexFundMarketList::where('fund_id', $id)->delete();

        $dataToInsert = [];

        for ($i = 0; $i < 50; $i++) {
            $dataToInsert[] = [
                'fund_id'    => $id,
                'direction'  => Arr::random(['positive', 'negative']), 
                'magnitude'  => rand(5, 15), 
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        IndexFundMarketList::insert($dataToInsert);

        return redirect()->back()->with('success', '50 data generated!');
    }
}