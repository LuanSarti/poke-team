<?php

use App\Http\Controllers\Team\TeamController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.api')->group(function() {
    Route::get('/find/{id}', [TeamController::class, 'find']);
    Route::post('/', [TeamController::class, 'store']);
    Route::get("/{userId}", [TeamController::class, 'findByUserId']);
    Route::put('/{id}', [TeamController::class, 'update']);
    Route::delete('/{id}', [TeamController::class, 'delete']);
});
