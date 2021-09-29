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




        Route::prefix('/system')->name('系统管理.')->group(function() {
            Route::get('/config', [\App\Http\Controllers\Admin\ConfigController::class, 'index'])->name('配置列表')->middleware('can:admin');
            Route::get('/config/{key}', [\App\Http\Controllers\Admin\ConfigController::class, 'show']);
            Route::post('/config', [\App\Http\Controllers\Admin\ConfigController::class, 'store']);
            Route::delete('/config/{id}', [\App\Http\Controllers\Admin\ConfigController::class, 'destroy']);
        });

        Route::prefix('/permission')->name('权限管理.')->group(function(){
            Route::get('/group', [\App\Http\Controllers\Admin\PermissionController::class, 'group'])->name('权限组')->middleware('can:admin');
            Route::get('/group/{id}', [\App\Http\Controllers\Admin\PermissionController::class, 'group_show']);
            Route::post('/group', [\App\Http\Controllers\Admin\PermissionController::class, 'group_store']);
            Route::delete('/group/{id}', [\App\Http\Controllers\Admin\PermissionController::class, 'group_destroy']);

            Route::get('/user', [\App\Http\Controllers\Admin\PermissionController::class, 'user'])->name('权限用户')->middleware('can:admin');
            Route::get('/user/{id}', [\App\Http\Controllers\Admin\PermissionController::class, 'user_show']);
            Route::post('/user', [\App\Http\Controllers\Admin\PermissionController::class, 'user_store']);
            Route::delete('/user/{id}', [\App\Http\Controllers\Admin\PermissionController::class, 'user_destroy']);
        });
    });
});
