<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'email_verified_at'=> now()
        ]);
        $user->assignRole('Employee');
        $user->sendEmailVerificationNotification();
        // event(new Registered($user));
        return response()->json([
            'message' => 'User registered successfully. Please verify email sent on registered email',
            'user' => $user
        ]);
    }
   public function login(Request $request)
{
    $credentials = $request->only('email','password');
  
    if(!Auth::attempt($credentials)){
        return response()->json([
            'message'=>'Invalid credentials'
        ],401);
    }

    $user = Auth::user();
    if(!$user->hasVerifiedEmail()){
    return response()->json([
        'message'=>'Please verify your email before logging in'
    ],403);
}
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'token'=>$token,
        'user'=>$user,
        'roles'=>$user->getRoleNames()
    ]);
}
public function me(Request $request)
{
    return response()->json([
        'user' => $request->user()
    ]);
}

public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Logout successful'
    ]);
} 
}