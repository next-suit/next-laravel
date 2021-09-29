<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin;
use App\Models\AdminGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class PermissionController extends BaseController
{
    /**
     * 权限组管理
     * @param Request $request
     * @return mixed
     */
    public function group(Request $request){
        $List = AdminGroup::when($request->input('name'), function($query, $value){
                $query->where('name', 'like', "%{$value}%");
            })
            ->latest()
            ->paginate();
        return $this->success($List);
    }

    public function group_show(Request $request, int $id){
        $Group = AdminGroup::firstOrNew(['id'=> $id], [
            'name'  => '',
            'menus' => [],
            'status'=> 1,
        ]);

        return $this->success([
            'data'  => $Group,
            'menus' => menus('admin'),
        ]);
    }

    public function group_store(Request $request){
        $param = $request->validate([
            'id'    => '',
            'name'  => 'required|unique:admin_groups,name',
            'menus' => 'array',
            'status'=> 'required|integer|min:0',
        ]);
        $Group = AdminGroup::updateOrCreate(['id'=> $param['id']], $param);
        return $this->success($Group);
    }

    public function group_destroy(int $id){
        AdminGroup::destroy($id);
        return $this->success();
    }

    /**
     * 操作员管理
     * @param Request $request
     * @return mixed
     */
    public function user(Request $request){
        $List = Admin::with(['group'])
            ->when($request->input('name'), function($query, $name){
                $query->where('name', 'like', "%{$name}%");
            })
            ->when($request->input('email'), function($query, $email){
                $query->where('email', 'like', "%{$email}%");
            })
            ->latest()
            ->paginate($request->input('rows'));
        return $this->success($List);
    }

    public function user_show(Request $request, int $id){
        $Data = Admin::firstOrNew(['id'=> $id], [
            'group_id'  => 0,
            'name'      => '',
            'mobile'     => '',
            'password'  => '',
            'status'  => 1,
            'remarks'  => '',
        ]);
        $Groups = AdminGroup::enable()->get();

        return $this->success([
            'data'  => $Data,
            'groups'=> $Groups,
        ]);
    }

    public function user_store(Request $request){
        $param = $request->validate([
            'id'    => '',
            'group_id'  => 'required|integer|min:1',
            'name'      => 'required|min:3',
//            'mobile'     => [
//                'size:11',
//                Rule::unique('admins')->ignore($request->input('id')),
//            ],
            'password'  => 'required_if:id,0|nullable|min:6',
            'order_resolve_password'  => 'nullable|min:6',
            'status' => 'required',
            'remarks'  => '',
        ]);
        if(!empty($param['password'])){
            $param['password'] = Hash::make($param['password']);
        }else{
            unset($param['password']);
        }
        if(empty($param['order_resolve_password'])){
            unset($param['order_resolve_password']);
        }
        $User = Admin::updateOrCreate(['id'=> $param['id']], $param);
        // 禁用后踢出登录
        if(!$User->status){
            $User->tokens()->delete();
        }
        return $this->success($User);
    }

    public function user_destroy(int $id){
        Admin::destroy($id);
        return $this->success();
    }
}
