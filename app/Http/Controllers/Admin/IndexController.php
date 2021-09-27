<?php


namespace App\Http\Controllers\Admin;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;

class IndexController extends BaseController
{



    public function info(Request $request){
        return $this->success([
            'site_name' => config('app.name'),
            'user' => Auth::user(),
        ]);
    }

    public function menus(Request $request){
        $menus = login_menus('admin');
        return $this->success($menus);
    }

    public function clear(Request $request){
        Artisan::call('cache:clear');
        Artisan::call('view:clear');
        Artisan::call('config:clear');
        Artisan::call('route:clear');
        return $this->success();
    }
}
