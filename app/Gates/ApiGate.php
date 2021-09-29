<?php


namespace App\Gates;

use App\Models\User;
use Illuminate\Support\Facades\Gate;

/**
 * Trait ApiGate
 *
 * @package App\Gates
 */
trait ApiGate
{
    /**
     * 主要区分店员、客户之间的接口权限
     * 页面权限由前端区分
     */
    public function defineApiGate(){
        // 客户，貌似不用指定这个，--预留
        Gate::define('customer', function(User $user){
            return true;
        });
    
        // 店员/客户经理
        Gate::define('manager', function(User $user){
            $manager = intval($user->manager);
            if($manager){
                return true;
            }
            return false;
        });
    }
}
