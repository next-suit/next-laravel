<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use RobThree\Auth\TwoFactorAuth;

class LoginController extends BaseController {

    /**
     * 后台管理员登录
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
        $params = $request->validate([
            'name' => 'required',
            'password' => 'required|min:6',
            'authenticator_secret' => 'nullable|min:6',
        ]);
        $User = Admin::where('name', $params['name'])->first();
        abort_if(!$User, 422, '账号不存在');
        if($User->authenticator_status){
            $Google2FA = new TwoFactorAuth();
            $verified = $Google2FA->verifyCode($User->authenticator_secret, $params['authenticator_secret'] ?? '', 0);
            abort_if(!$verified, 422, '二步验证码不匹配');
        }
        abort_if($User->status !== 1, 422, '账号已被禁用');
        abort_if(!Hash::check($params['password'], $User->password), 422, '密码错误');

        $token = $User->createToken('login');
        return $this->success([
            'user' => $User,
            'token' => $token->plainTextToken,
        ]);
    }

    /**
     * 修改密码
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function password(Request $request){
        $param = $request->validate([
            'old'   => 'required|min:6',
            'new'   => 'required|min:6|confirmed',
        ]);
        $User = Auth::user();
        $old_hash = Auth::user()->getAuthPassword();
        abort_if(!Hash::check($param['old'], $old_hash), 422, '旧密码错误');
        $User->password = Hash::make($param['new']);
        $User->save();
        return $this->success();
    }

    /**
     * 退出登录
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request){
        Auth::id() && Auth::logout();
        return $this->success();
    }
}
