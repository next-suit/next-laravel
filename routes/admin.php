<?php
use Illuminate\Support\Facades\Route;

Route::get('/', [\App\Http\Controllers\Admin\BaseController::class, 'welcome']);

Route::name('admin.')->group(function(){
    Route::post('/login', [\App\Http\Controllers\Admin\LoginController::class, 'login']);
    Route::post('/logout', [\App\Http\Controllers\Admin\LoginController::class, 'logout']);
    Route::any('/index/dashboard22', [\App\Http\Controllers\Admin\IndexController::class, 'dashboard']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/password', [\App\Http\Controllers\Admin\LoginController::class, 'password']);

        Route::prefix('/index')->name('主页.')->group(function () {
            Route::get('/dashboard', [\App\Http\Controllers\Admin\IndexController::class, 'dashboard'])->name('数据报表')->middleware('can:admin');
            Route::get('/info', [\App\Http\Controllers\Admin\IndexController::class, 'info']);
            Route::get('/menus', [\App\Http\Controllers\Admin\IndexController::class, 'menus']);
            Route::get('/clear', [\App\Http\Controllers\Admin\IndexController::class, 'clear']);
        });
    });
});
