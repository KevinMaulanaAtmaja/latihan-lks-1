<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\COntrollers\API\AuthController;
use App\Http\Controllers\API\ConsultationController;
use App\Http\Controllers\API\SpotController;
use App\Http\Controllers\API\VanccinationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(AuthController::class)->group(function() {
    Route::post('v1/auth/login', 'login');
});

Route::middleware('auth:sanctum')->group(function() {
    Route::post('v1/auth/logout', [AuthController::class,'logout']);
    Route::apiResource('v1/consultations', ConsultationController::class);
    Route::apiResource('v1/spots', SpotController::class);
    Route::apiResource('v1/vaccinations', VanccinationController::class);
});


