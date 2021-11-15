<?php
namespace App\Http\Controllers\Admin;


use Illuminate\Support\Facades\Route;

Route::get('/', [BaseController::class, 'welcome']);

Route::name('admin.')->group(function(){
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::any('/index/dashboard22', [IndexController::class, 'dashboard']);

    Route::middleware(['auth:sanctum'])->group(function() {
        Route::post('/password', [LoginController::class, 'password']);

        Route::prefix('/index')->name('主页.')->group(function(){
            Route::get('/dashboard', [IndexController::class, 'dashboard'])->name('数据报表')->middleware('can:admin');
            Route::get('/info', [IndexController::class, 'info']);
            Route::get('/menus', [IndexController::class, 'menus']);
            Route::get('/clear', [IndexController::class, 'clear']);
        });

        Route::prefix('/user')->name('用户管理.')->group(function(){
            Route::get('/', [UserController::class, 'index'])->name('用户列表')->middleware('can:admin');
            Route::get('/{id}', [UserController::class, 'show']);
        });




        Route::prefix('/system')->name('系统管理.')->group(function(){
            Route::get('/config', [ConfigController::class, 'index'])->name('配置列表')->middleware('can:admin');
            Route::get('/config/{key}', [ConfigController::class, 'show']);
            Route::post('/config', [ConfigController::class, 'store']);
            Route::delete('/config/{id}', [ConfigController::class, 'destroy']);
        });

        Route::prefix('/permission')->name('权限管理.')->group(function(){
            Route::get('/group', [PermissionController::class, 'group'])->name('权限组')->middleware('can:admin');
            Route::get('/group/{id}', [PermissionController::class, 'group_show']);
            Route::post('/group', [PermissionController::class, 'group_store']);
            Route::delete('/group/{id}', [PermissionController::class, 'group_destroy']);

            Route::get('/user', [PermissionController::class, 'user'])->name('权限用户')->middleware('can:admin');
            Route::get('/user/{id}', [PermissionController::class, 'user_show']);
            Route::post('/user', [PermissionController::class, 'user_store']);
            Route::delete('/user/{id}', [PermissionController::class, 'user_destroy']);
        });
    });
});
