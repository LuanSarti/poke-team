<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;


Route::post('/login',[AuthController::class, 'login']);
Route::post('/register' ,[AuthController::class, 'register']);

Route::middleware('auth.api')->group(function() {
    Route::get("/me", [AuthController::class, 'me']);
});
