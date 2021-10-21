<?php


namespace App\Http\Controllers\Api;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class LoginController extends BaseController
{

    public function login(Request $request){
        $params = $request->validate([
            'mobile'=> 'required|size:11',
            'password'=> 'required|min:6',
        ]);
        $User = User::where(['mobile' => $params['mobile']])->first();
        abort_if(!$User, 422, '该用户不存在');
        abort_if(!$User->status, 422, '该用户已被禁用');
        abort_if(!Hash::check($params['password'], $User->password), 422, '登录密码不正确');
        $Token = $User->createToken('login');
        return $this->success([
            'user' => $User,
            'token' => $Token->plainTextToken,
        ]);
    }

    public function register(Request $request){
        $params = $request->validate([
            'mobile'=> 'required|size:11|unique:users',
            'password'=> 'required|min:6',
        ]);
        $User = User::create($params);
        $User->name = 'USER'.Str::padLeft($User->id, 4, '0');
        $User->save();
        $Token = $User->createToken('login');
        return $this->success([
            'user' => $User,
            'token' => $Token->plainTextToken,
        ]);
    }
}
