<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\Process\Process;

class CommandController extends Controller
{
    use AuthorizesRequests;

    /**
     * List of allowed commands.
     */
    private array $commandList = [
        [
            'command' => 'php artisan migrate',
            'description' => 'Run the database migrations',
        ],
        [
            'command' => 'php artisan storage:link',
            'description' => 'Create the symbolic links configured for the application',
        ],
        [
            'command' => 'php artisan storage:unlink',
            'description' => 'Create the symbolic links configured for the application',
        ],
        [
            'command' => 'php artisan optimize',
            'description' => 'Cache the framework bootstrap files',
        ],
        [
            'command' => 'php artisan optimize:clear',
            'description' => 'Remove the cached bootstrap files',
        ],
        [
            'command' => 'php artisan cache:clear',
            'description' => 'Flush the application cache',
        ],
        [
            'command' => 'php artisan config:clear',
            'description' => 'Remove the configuration cache file',
        ],
        [
            'command' => 'php artisan route:clear',
            'description' => 'Remove the route cache file',
        ],
        [
            'command' => 'php artisan view:clear',
            'description' => 'Clear all compiled view files',
        ],
    ];

    public function __construct()
    {
        //$this->authorizeResource(BikeDiscount::class, 'bikeDiscount');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Superadmin/Command/Index', [
            'commandList' => $this->commandList,
            'lastCommandOutput' => session('last_command_output'),
            'lastCommandRun' => session('last_command_run'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }

    public function run(Request $request)
    {
        $request->validate([
            'command' => ['required', 'string', Rule::in(collect($this->commandList)->pluck('command'))],
        ]);

        $commandOnly = str_replace('php artisan ', '', $request->command);
        $outputBuffer = new BufferedOutput();
        Artisan::call($commandOnly, [], $outputBuffer);
        $output = $outputBuffer->fetch();

        session([
            'last_command_output' => $output,
            'last_command_run' => $request->command,
        ]);

        return redirect()->route('command.index');
    }
}
