<?php


namespace App\Http\Controllers\Admin;


use App\Models\User;
use Illuminate\Http\Request;

class UserController extends BaseController
{

    public function index(Request $request){
        $List = User::with(['parent'])
            ->when($request->input('id'), function($query, $value){
                $query->where('id', $value);
            })
            ->when($request->input('name'), function($query, $value){
                $query->where('name', 'like', "%{$value}%");
            })
            ->when($request->input('mobile'), function($query, $value){
                $query->where('mobile', 'like', "%{$value}%");
            })
            ->when($request->input('email'), function($query, $value){
                $query->where('email', 'like', "%{$value}%");
            })
            ->latest()
            ->paginate();
        $List->each(function($v){
            $v->makeVisible(['mobile', 'remarks']);
            $v->parent && $v->parent->makeVisible(['mobile', 'remarks']);
        });
        return $this->success([
            'list' => $List,
        ]);
    }

    public function show(Request $request, int $id){
        $Data = User::firstOrNew(['id' => $id], [
            'name' => '',
            'mobile' => '',
            'email' => '',
            'avatar' => '',
            'status' => 1,
        ]);
        $Data->makeVisible(['mobile', 'remarks']);
        $Data->parent && $Data->parent->makeVisible(['mobile', 'remarks']);
        return $this->success([
            'data' => $Data,
            'url' => config('app.url'),
        ]);
    }
}
