<?php

use Illuminate\Support\Facades\Route;

Route::prefix('/auth')->group(base_path('/routes/api/auth.php'));
Route::prefix('/user')->group(base_path('/routes/api/user.php'));
Route::prefix('/team')->group(base_path('/routes/api/team.php'));
