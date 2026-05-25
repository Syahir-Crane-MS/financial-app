<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\EventSession;
use App\Models\Income;
use App\Models\DividenStockMarket;
use App\Models\IndexFundMarket;
use App\Models\Insurance;
use App\Models\Learning;
use App\Models\RealEstate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'role' => 'admin',
            'name' => 'Izztorich',
            'email' => 'izztorich@gmail.com',
            'password' => bcrypt('izztorich@gmail.com'),
        ]);

        User::factory()->create([
            'role' => 'admin',
            'name' => 'Developer',
            'email' => 'developer@crane-a.co.jp',
            'password' => bcrypt('developer@crane-a.co.jp'),
        ]);

        User::factory()->create([
            'role' => 'admin',
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin@admin.com'),
        ]);

        EventSession::create([
            'title' => 'Financial Talk #1',
            'active' => 'true',
            'passcode' => 'ABC123',
            'initial_salary' => '5000'
        ]);

        Income::create([
            'title' => 'Podcast Editor',
            'income_type' => 'side_hustle',
            'market_value' => '2800',
            'valuation' => '2800',
            'loan' => '0',
            'monthly_cf' => '840',
            'upfront_cost' => '2800',
            'energy_score' => '-45',
            'level' => 'active',
            'description' => 'Removing every um and ah for a modest fee'
        ]);

        Income::create([
            'title' => 'Tuition/Tutoring Center',
            'income_type' => 'side_hustle',
            'market_value' => '1200',
            'valuation' => '1200',
            'loan' => '0',
            'monthly_cf' => '480',
            'upfront_cost' => '1200',
            'energy_score' => '-45',
            'level' => 'active',
            'description' => 'Re-teaching math while your brain feels'
        ]);

        DividenStockMarket::create([
            'title' => 'MAYBANK (MBBM)',
            'current_stock_price' => '10000',
            'dividen_per_share' => '2.50'
        ]);

        DividenStockMarket::create([
            'title' => 'CIMB',
            'current_stock_price' => '10000',
            'dividen_per_share' => '2.40'
        ]);

        IndexFundMarket::create([
            'title' => 'S&P 500 (SPY)',
            'current_fund_price' => '14000',
        ]);

        RealEstate::create([
            'title' => 'Studio',
            'type' => 'residential',
            'market_value' => '250000',
            'down_payment' => '0',
            'loan' => '225000',
            'monthly_cf' => '0',
            'selling_price' => '160000',
            'est_cash_out' => '65000',
            'category' => 'studio',
            'description' => 'One mans urgent exit is your first taste of liquid'
        ]);

        Insurance::create([
            'title' =>'PA & Mediacal',
            'description' => 'Coverage for hospital bills and personal accidents.',
            'monthly_contribution' => '450',
        ]);

        Insurance::create([
            'title' =>'Home & Motor',
            'description' => 'Coverage for property damage and vehicle accidents',
            'monthly_contribution' => '250',
        ]);

        Learning::create([
            'title' => 'Design Template Mastery',
            'type' => 'beginner',
            'description' => 'Speeding up marketing asset creation with standardized pre-set styles',
            'upfront_cost' => '1500',
            'impact' => '+5% cash flow',
            'life_score' => '+10',
            'energy_score' => '+8',
            'pre_requisite' => 'Side Hustle / Business',
            'category' => 'business_mastery'
        ]);


    }
}