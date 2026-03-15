<?php
use App\Models\User;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\UserController;
 use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\ResetPasswordController;
use Spatie\Permission\Models\Role;
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/forgot-password',[ForgotPasswordController::class,'sendResetLink']);

Route::post('/reset-password',[ResetPasswordController::class,'reset']);
Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {

    if (! URL::hasValidSignature($request)) {
        return redirect('http://localhost:3000/login?error=invalid-link');
    }

    $user = User::findOrFail($id);

    if (! hash_equals(sha1($user->email), $hash)) {
        return redirect('http://localhost:3000/login?error=invalid-link');
    }

    if (! $user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
    }

    return redirect('http://localhost:3000/login?verified=1');

})->middleware('signed')->name('verification.verify');

Route::middleware(['auth:sanctum'])->group(function(){
        Route::get('/me',[AuthController::class,'me']);

    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/users',[UserController::class,'index']);
      

    // Route::post('/users',[UserController::class,'store']);
       

    // Route::put('/users/{id}',[UserController::class,'update']);
      

    // Route::delete('/users/{id}',[UserController::class,'destroy']);
         Route::middleware('role:Admin')->group(function(){

        Route::post('/users',[UserController::class,'store']);
        Route::put('/users/{id}',[UserController::class,'update']);
        Route::delete('/users/{id}',[UserController::class,'destroy']);

    });
   Route::get('/roles', function () {
    return Role::all();
});

});