<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\VisitPController; 

Route::get('/semesters', [SemesterController::class, 'index']);
Route::post('/semesters', [SemesterController::class, 'store']);
Route::put('/semesters/{semester}', [SemesterController::class, 'update']);
Route::put('/semesters/{id}', [SemesterController::class, 'update']);
Route::delete('/semesters/{semester}', [SemesterController::class, 'destroy']); // Para eliminar

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::apiResource('survey', SurveyController::class);
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/survey/get-by-slug/{survey:slug}', [SurveyController::class, 'getBySlug']);
Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);
Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);
Route::post('/visit', [VisitPController::class, 'store']);
Route::get('/visit', [VisitPController::class, 'index']);
Route::delete('/visit/{id}', [VisitPController::class, 'destroy']);
Route::put('/visit/{id}', [VisitPController::class, 'update']);
