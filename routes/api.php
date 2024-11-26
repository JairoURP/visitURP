<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\SurveyQuestionAnswerController;
use Illuminate\Support\Facades\Route;

// Rutas para Semesters
Route::get('/semesters', [SemesterController::class, 'index']);
Route::post('/semesters', [SemesterController::class, 'store']);
Route::put('/semesters/{id}', [SemesterController::class, 'update']);
Route::delete('/semesters/{id}', [SemesterController::class, 'destroy']);

// Rutas para SurveyQuestionAnswer
Route::get('/survey-question-answers', [SurveyQuestionAnswerController::class, 'index']);
Route::post('/survey-question-answers', [SurveyQuestionAnswerController::class, 'store']);
Route::put('/survey-question-answers/{id}', [SurveyQuestionAnswerController::class, 'update']);

// Rutas protegidas
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::apiResource('survey', SurveyController::class);
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

// Rutas de autenticación y survey
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/survey/get-by-slug/{survey:slug}', [SurveyController::class, 'getBySlug']);
Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);
