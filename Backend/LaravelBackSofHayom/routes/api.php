<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\PaymentController;



// Payment Routes
Route::post('/payment/token', [PaymentController::class, 'generateToken']);
Route::post('/payment/process', [PaymentController::class, 'processPayment'])->middleware('jwt.auth');;
Route::get('/payment/track', [PaymentController::class, 'trackOrder']);
Route::post('/payment/cancel', [PaymentController::class, 'cancelPayment']);
Route::get('/payment/success', [PaymentController::class, 'paymentSuccess']);
Route::get('/payment/failure', [PaymentController::class, 'paymentFailure']);
Route::post('/payment/webhook', [PaymentController::class, 'webhook']);  // For handling Braintree webhooks

// auth managment
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);
Route::post('/register', [AuthController::class, 'register']); // Regular user registration
Route::post('/registerBusiness', [AuthController::class, 'registerBusiness']); // Business user registration

// Autherization for business
Route::get('/authorizeBusiness/{token}', [AuthController::class, 'authorizeBusiness'])->name('authorizeBusiness');


// Roles CRUD
Route::get('/roles', [RoleController::class, 'index']);
Route::post('/roles', [RoleController::class, 'store']);
Route::get('/roles/{id}', [RoleController::class, 'show']);
Route::put('/roles/{id}', [RoleController::class, 'update']);
Route::delete('/roles/{id}', [RoleController::class, 'destroy']);

// Users CRUD
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::put('users/{id}/changepassword', [UserController::class, 'changePassword']);



// Products CRUD
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// Orders CRUD
Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
Route::put('/orders/{id}', [OrderController::class, 'update']);
Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

// Order Details CRUD
Route::get('/order-details', [OrderDetailController::class, 'index']);
Route::post('/order-details', [OrderDetailController::class, 'store']);
Route::get('/order-details/{id}', [OrderDetailController::class, 'show']);
Route::put('/order-details/{id}', [OrderDetailController::class, 'update']);
Route::delete('/order-details/{id}', [OrderDetailController::class, 'destroy']);

// Receipts CRUD
Route::get('/receipts', [ReceiptController::class, 'index']);
Route::post('/receipts', [ReceiptController::class, 'store']);
Route::get('/receipts/{id}', [ReceiptController::class, 'show']);
Route::put('/receipts/{id}', [ReceiptController::class, 'update']);
Route::delete('/receipts/{id}', [ReceiptController::class, 'destroy']);

// Businesses CRUD
Route::get('/businesses', [BusinessController::class, 'index']);
Route::post('/businesses', [BusinessController::class, 'store']);
Route::get('/businesses/{id}', [BusinessController::class, 'show']);
Route::put('/businesses/{id}', [BusinessController::class, 'update']);
Route::delete('/businesses/{id}', [BusinessController::class, 'destroy']);
Route::get('/businesses/user/{user_id}', [BusinessController::class,'getByUserId']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
