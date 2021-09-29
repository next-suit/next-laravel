<?php


namespace App\Gates;


use App\Models\Admin;
use App\Models\AdminGroup;
use Illuminate\Support\Facades\Gate;

trait AdminGate
{
    public function defineAdminGate(){

        // 验证前判断，如果是超级管理员就不用继续验证权限了，
        Gate::before(function(Admin $admin){
            if($admin->isSuper()){
                return true;
            }
            return null;
        });

        // admin 只有一个权限，不存在增删改查区分，所以这里统一叫 admin，使用 middleware('can:admin') 即可
        Gate::define('admin', function(Admin $admin){
            $roles = AdminGroup::where('id', $admin->group_id)->value('menus');
            $route = substr(request()->path(), 5);
            return in_array($route, $roles);
        });
    }
}
