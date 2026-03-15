<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
{
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:6|confirmed',
    ]);

    $status = Password::reset(
        $request->only('email','password','password_confirmation','token'),
        function ($user, $password) {

            $user->forceFill([
                'password' => Hash::make($password),
                'email_verified_at' => now()
            ])->setRememberToken(Str::random(60));

            $user->save();
        }
    );

    if ($status === Password::PASSWORD_RESET) {
        return response()->json([
            'message' => 'Password reset successful'
        ]);
    }

    return response()->json([
        'message' => 'Invalid token'
    ],400);
}
}