<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DividenStockMarketController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\IndexFundController;
use App\Http\Controllers\InsuranceController;
use App\Http\Controllers\LearningController;
use App\Http\Controllers\MarketListContoller;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\RealEstateController;
use App\Http\Controllers\LiveEventController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserEventController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\PublicController;

use App\Http\Controllers\Superadmin\CommandController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/command', [CommandController::class, 'index'])->name('command.index');
    Route::post('/command', [CommandController::class, 'run'])->name('command.run');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');

    Route::name('event.')->prefix('event')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('index');
        Route::get('/{id}/participants', [EventController::class, 'participants'])->name('participants');
        Route::get('/{id}/participants/{pid}/session/{sid}', [EventController::class, 'participantSession'])->name('participantSession');
        Route::post('/create', [EventController::class, 'create'])->name('create');
        Route::post('/update/{id}', [EventController::class, 'update'])->name('update');
        Route::post('/update-status/{id}', [EventController::class, 'updateStatus'])->name('updateStatus');
        Route::delete('/reset/{id}', [EventController::class, 'reset'])->name('reset');

    });

    Route::name('income.')->prefix('income')->group(function () {
        Route::get('/', [IncomeController::class, 'index'])->name('index');
        Route::post('/create', [IncomeController::class, 'create'])->name('create');
        Route::post('/update/{id}', [IncomeController::class, 'update'])->name('update');
        Route::post('/delete/{id}', [IncomeController::class, 'delete'])->name('delete');
    });

    Route::name('realestate.')->prefix('realestate')->group(function () {
        Route::get('/', [RealEstateController::class, 'index'])->name('index');
        Route::post('/create', [RealEstateController::class, 'create'])->name('create');
        Route::post('/update/{id}', [RealEstateController::class, 'update'])->name('update');
        Route::post('/delete/{id}', [RealEstateController::class, 'delete'])->name('delete');
    });

    Route::name('learning.')->prefix('learning')->group(function () {
        Route::get('/', [LearningController::class, 'index'])->name('index');
        Route::post('/create', [LearningController::class, 'create'])->name('create');
        Route::post('/update/{id}', [LearningController::class, 'update'])->name('update');
        Route::post('/delete/{id}', [LearningController::class, 'delete'])->name('delete');
    });

    Route::name('dividen.')->prefix('dividen-stock')->group(function () {
        Route::get('/', [DividenStockMarketController::class, 'index'])->name('index');
        Route::get('/view/{id}', [DividenStockMarketController::class, 'view'])->name('view');
        Route::post('/create', [DividenStockMarketController::class, 'create'])->name('create');
        Route::post('/update/{id}', [DividenStockMarketController::class, 'update'])->name('update');
        Route::get('/delete/{id}', [DividenStockMarketController::class, 'delete'])->name('delete');
        Route::get('/generate/{id}', [DividenStockMarketController::class, 'generateData'])->name('generateData');
    });
    
    Route::name('fund.')->prefix('index-fund')->group(function () {
        Route::get('/', [IndexFundController::class, 'index'])->name('index');
        Route::get('/view/{id}', [IndexFundController::class, 'view'])->name('view');
        Route::post('/create', [IndexFundController::class, 'create'])->name('create');
        Route::post('/update/{id}', [IndexFundController::class, 'update'])->name('update');
        Route::post('/delete/{id}', [IndexFundController::class, 'delete'])->name('delete');
        Route::get('/generate/{id}', [IndexFundController::class, 'generateData'])->name('generateData');
    });

    Route::name('insurance.')->prefix('insurance')->group(function () {
        Route::get('/', [InsuranceController::class, 'index'])->name('index');
        Route::post('/create', [InsuranceController::class, 'create'])->name('create');
        Route::post('/update/{id}', [InsuranceController::class, 'update'])->name('update');
        Route::post('/delete/{id}', [InsuranceController::class, 'delete'])->name('delete');
    });

    Route::name('participant.')->prefix('participant')->group(function () {
        Route::get('/', [ParticipantController::class, 'index'])->name('index');
        Route::get('/view/{id}', [ParticipantController::class, 'view'])->name('view');
        Route::get('/view/{id}/session/{sid}', [ParticipantController::class, 'session'])->name('session');
        Route::get('/view/{id}/session/{sid}/transaction/{tid}', [ParticipantController::class, 'transaction'])->name('transaction');
    });

    Route::get('/life-event', [LiveEventController::class, 'index'])->name('life.index');

    Route::get('/market', [MarketListContoller::class, 'index'])->name('market.index');

});

Route::middleware(['auth', 'role:user'])->group(function () {
    Route::get('/home', [DashboardController::class, 'home'])->name('dashboard.home');

    Route::name('event.')->prefix('event')->group(function () {
        Route::get('/list', [EventController::class, 'eventList'])->name('eventList');
    });

    Route::name('myevent.')->prefix('my-event')->group(function () {
        Route::get('/list', [UserEventController::class, 'eventList'])->name('eventList');
        Route::post('/create', [UserEventController::class, 'create'])->name('create');
        Route::get('/{id}', [UserEventController::class, 'view'])->name('view');
        Route::get('/{id}/scanner', [UserEventController::class, 'scanner'])->name('scanner');
        Route::get('/{id}/result', [UserEventController::class, 'result'])->name('result');
        Route::get('/{id}/expense', [UserEventController::class, 'expense'])->name('expense');
        Route::get('/{id}/error', [UserEventController::class, 'error'])->name('error');
    });

    Route::name('transaction.')->prefix('transaction')->group(function () {
        Route::post('/create', [TransactionController::class, 'create'])->name('create');
        Route::get('/{id}/list', [TransactionController::class, 'viewAll'])->name('viewAll');
        Route::get('/{id}/income', [TransactionController::class, 'viewIncome'])->name('viewIncome');
        Route::get('/{id}/stock', [TransactionController::class, 'viewStock'])->name('viewStock');
        Route::get('/{id}/fund', [TransactionController::class, 'viewFund'])->name('viewFund');
        Route::get('/{id}/insurance', [TransactionController::class, 'viewInsurance'])->name('viewInsurance');
        Route::get('/{id}/learning', [TransactionController::class, 'viewLearning'])->name('viewLearning');
        Route::get('/{id}/life', [TransactionController::class, 'viewLife'])->name('viewLife');
        Route::get('/{id}/market', [TransactionController::class, 'viewMarket'])->name('viewMarket');
        Route::get('/{id}/realestate', [TransactionController::class, 'viewRealEstate'])->name('viewRealEstate');
    });

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::name('public.')->prefix('public')->group(function () {
    Route::get('/income', [PublicController::class, 'income'])->name('income');
    Route::get('/dividen-stock', [PublicController::class, 'dividen'])->name('dividen');
    Route::get('/index-fund', [PublicController::class, 'fund'])->name('fund');
    Route::get('/insurance', [PublicController::class, 'insurance'])->name('insurance');
    Route::get('/learning', [PublicController::class, 'learning'])->name('learning');
    Route::get('/real-estate', [PublicController::class, 'realestate'])->name('realestate');
    Route::get('/news', [PublicController::class, 'news'])->name('news');
    Route::get('/life-event', [PublicController::class, 'life'])->name('life');
});

Route::get('/secret-migrate-url', function () {
    try {
        Artisan::call('migrate:fresh', [
            '--seed' => true,
            '--force' => true,
        ]);

        $output = Artisan::output();

        return response()->json([
            'status' => 'success',
            'message' => 'Database successfully refreshed and seeded!',
            'output' => $output
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
});

Route::get('/secret-storage-link-url', function () {
    try {
        Artisan::call('storage:link');

        $output = Artisan::output();

        return response()->json([
            'status' => 'success',
            'message' => 'Storage link successfully created!',
            'output' => $output
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
});

require __DIR__.'/auth.php';