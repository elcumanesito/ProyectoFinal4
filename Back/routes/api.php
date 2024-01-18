<?php

use App\Http\Controllers\PaginasController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('/login', 'App\Http\Controllers\AuthController@login');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::post('/me', 'App\Http\Controllers\AuthController@me');
    Route::post ('register', 'App\Http\Controllers\AuthController@register');
    Route::put('/update', 'App\Http\Controllers\AuthController@update');
    Route::patch('/{userId}/toggle-status', 'App\Http\Controllers\AuthController@toggleStatus');

});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth',
], function () {

    // Rutas para Roles

    Route::get('/index', 'App\Http\Controllers\RolesController@index');
    Route::post('/store', 'App\Http\Controllers\RolesController@store');
    Route::patch('/{id}/toggle-status', 'App\Http\Controllers\RolesController@toggleStatus');

    // Rutas para Usuarios
    Route::get('/usuarios/index', 'App\Http\Controllers\UsersController@index');
    Route::post('/usuarios/store', 'App\Http\Controllers\UsersController@store');
    Route::patch('/usuarios/{id}/toggle-status', 'App\Http\Controllers\UsersController@toggleStatus');

    // Rutas para paginas

    Route::get('/paginas', 'App\Http\Controllers\PaginasController@index');
    Route::post('/paginas', 'App\Http\Controllers\PaginasController@store');
});

Route::options('{any}', function () {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
})->where('any', '.*');

Route::middleware('auth:api')->get('/user-info', function () {
    return auth()->user();
});

