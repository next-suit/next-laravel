<?php

namespace App\Http\Controllers\Admin;

use App\Models\Config;
use Illuminate\Http\Request;

class ConfigController extends BaseController
{

    public function index(Request $request)
    {
        $List = Config::where('type', '!=', '')
            ->when($request->input('key'), function($query, $value){
                $query->where('key', 'like', "%{$value}%");
            })
            ->paginate();
        return $this->success($List);
    }

    public function show(Request $request, int $id){
        $Data = Config::firstOrNew(['id'=> $id], [
            'key'   => '',
            'value' => '',
            'type' => 'string',
            'tips' => '',
        ]);
        return $this->success([
            'data' => $Data,
            'types' => collect(Config::TYPES)->transform(function($v, $k){
                return ['label' => $v, 'value' => $k];
            })->values(),
        ]);
    }

    public function store(Request $request)
    {
        $param = $request->validate([
            'id'    => '',
            'key'   => 'required',
            'value' => 'required',
            'type'  => 'required',
            'tips'  => 'required',
        ]);
        $Data = Config::set($param['key'], $param['value']);
        $Data->type = $param['type'];
        $Data->tips = $param['tips'];
        $Data->save();
        return $this->success($Data);
    }

    public function destroy(int $id)
    {
        Config::destroy($id);
        return $this->success();
    }
}
