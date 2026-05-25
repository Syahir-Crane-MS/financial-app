<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        // superadmin allowed all
        if ($user->role === 'superadmin') {
            return $next($request);
        }

        if (!in_array($user->role, $roles)) {
            return redirect()->back()->with('error', 'Unauthorized access.');
        }

        return $next($request);
    }
}