<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class TrimStrings
{
    public function handle(Request $request, Closure $next)
    {
        $input = $request->all();

        foreach ($input as $key => $value) {
            if (is_string($value)) {
                $input[$key] = trim($value);
            }
        }

        $request->merge($input);

        return $next($request);
    }
}