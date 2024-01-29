<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dropin', function (Request $request) {
    $token = $request->query('token');
    $cart = $request->query('cart');
    return view('braintree', ['token' => $token]);
});

Route::get('/authorizeBusiness', 'AuthController@authorizeBusiness');
