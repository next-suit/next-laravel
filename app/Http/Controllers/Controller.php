<?php

namespace App\Http\Controllers;

use App\Http\Responses\JsonResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, JsonResponse;

    /**
     * 文件上传，可一次多张，数组
     *
     * 如果需要用原始文件名保存
     * store 改为 storeAs，并加入第二个参数 $file->getClientOriginalName()
     *
     * @param Request $request
     * @return array
     */
    public function upload(Request $request){
        $allFile = $request->allFiles();
        $files = [];
        foreach($allFile as $name => $file){
            $path = $file->store('upload/'.date('Y/m/d'));
            $files[$name] = Storage::url($path);
        }
        return $files;
    }

    /**
     * 防抖动，避免请求过快
     */
    public function debounce(){
        $md5 = md5(serialize(\request()->all()));
        $key = __CLASS__.'::'.__FUNCTION__.':'.$md5;
        if(Cache::has($key)){
            abort(422, __('Action is fast, please try again later'));
        }
        Cache::put($key, 1, 3);
    }
}
