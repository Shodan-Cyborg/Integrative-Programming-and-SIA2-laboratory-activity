<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\UserController;

Route::get('users', function (Request $request) {
    $user = $request->users();
})->middleware('auth:sanctum');


Route::get('/transactionssiaactivity1', [TransactionController::class, 'getTransactionData1']);
Route::get('/transactionssiaactivity2', [TransactionController::class, 'getTransactionData2']);
Route::get('/transactionssiaactivity3', [TransactionController::class, 'getTransactionData3']);
Route::get('/transactionssiaactivity4', [TransactionController::class, 'getTransactionData4']);

//Route for users and products in reactJS as frontend
Route::get('/users', [UserController::class, 'index']);
/*Route::get('/display-product', [ProductController::class, 'display']);*/
Route::get('/get-product', [ProductController::class, 'fetch']);
Route::post('/add-product', [ProductController::class, 'store']);
Route::get('/edit-product/{product_id}', [ProductController::class, 'edit']);
Route::put('/update-product/{product_id}', [ProductController::class, 'update']);
Route::put('/delete-product/{product_id}', [ProductController::class, 'delete']);

