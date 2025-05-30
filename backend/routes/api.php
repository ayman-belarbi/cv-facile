<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication routes
Route::post('/register', [App\Http\Controllers\AuthController::class, 'register']);
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [App\Http\Controllers\AuthController::class, 'user']);
    Route::put('/user', [App\Http\Controllers\AuthController::class, 'updateProfile']);
    Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);
    Route::delete('/user', [App\Http\Controllers\AuthController::class, 'deleteAccount']);
    Route::apiResource('resumes', App\Http\Controllers\ResumeController::class);
});
