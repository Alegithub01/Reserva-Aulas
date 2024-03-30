<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/ambientes', [AmbienteController::class, 'index']); 
Route::get('/ambientes/{id}', [AmbienteController::class, 'show']); 
Route::post('/ambientes', [AmbienteController::class, 'store']); 
Route::put('/ambientes/{id}', [AmbienteController::class, 'update']); 
Route::delete('/ambientes/{id}', [AmbienteController::class, 'destroy']); 