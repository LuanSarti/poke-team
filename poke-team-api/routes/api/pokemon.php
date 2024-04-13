<?php

use App\Http\Controllers\Pokemon\PokemonController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.api')->group(function() {
    Route::get('/list/{offset}', [PokemonController::class, 'list']);
    Route::get('/find/{id}', [PokemonController::class, 'find']);
});
