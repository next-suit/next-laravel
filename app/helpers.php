<?php

/**
 * 按规则打散一个字符串，得到一个16位 crypto 的密码
 * 1. 使用末尾截取 16 个字符
 * 2. 然后倒序排列后 10 个字符
 * 3. 最后拼接在一起，返回新字符串即为新密码
 * @param string $string
 * @return string
 */
function shuffle_salt(string $string){
    $array = $array2 = [];
    for($i = 0; $i < 8; $i++){
        $array[] = substr($string, $i * 2, 2);
    }
    $array2[] = array_pop($array);
    $array2[] = array_shift($array);
    $array2[] = array_shift($array);
    $array2[] = array_pop($array);
    $array2[] = array_shift($array);
    $array2[] = array_pop($array);
    $array2[] = array_shift($array);
    $array2[] = array_pop($array);
    $string = implode('', $array2);
    return $string;
}

/**
 * 生成唯一订单号
 * @param string $prefix
 * @return string
 */
function generate_order_no(string $prefix = ''){
    $order_no = $prefix.date('YmdHis');
    $order_no .= rand(1000, 9999);
    $order_no .= rand(1000, 9999);
    $order_no .= rand(10, 99);
    return $order_no;
}

/**
 * 网关使用，生成签名
 * @param array $params
 * @param string $mch_key
 * @return string
 */
function gateway_build_sign(array $params, string $mch_key){
    unset($params['sign']);
    $params2 = [];
    ksort($params);
    foreach ($params as $k => $v){
        if($v === null || $v === ''){
            continue;
        }
        $params2[] = $k.'='.$v;
    }
    $query_string = implode('&', $params2);
    return strtolower(md5($query_string . $mch_key));
}

/**
 * 网关使用，比对签名
 * @param $params
 * @param $mch_key
 * @return bool
 */
function gateway_check_sign(array $params, string $mch_key){
    $sign = $params['sign'];
    unset($params['sign']);
    $params2 = [];
    ksort($params);
    foreach ($params as $k => $v){
        if($v === null || $v === ''){
            continue;
        }
        $params2[] = $k.'='.$v;
    }
    $query_string = implode('&', $params2);
    $build_sign = strtolower(md5($query_string . $mch_key));
    return strcasecmp($sign, $build_sign) === 0;
}


/**
 * 格式化银行卡号为四位空格分隔
 * @param $card_no
 * @return string
 */
function format_card_no($card_no){
    if(stripos($card_no, '@') > 0 || strlen($card_no) == 11){
        return $card_no;
    }
    $length = strlen($card_no);
    $stage = ceil($length / 4);
    $state_arr = [];
    for ($i = 0; $i < $stage; $i++){
        $state_arr[] = substr($card_no, $i * 4, 4);
    }
    return implode(' ', $state_arr);
}
















































/************************************************ 后台使用部分 *****************************************************/

function menus(string $prefix){
    $menus = [];
    collect(app('router')->getRoutes())->each(function($v) use (&$menus, $prefix){
        parseMenus($menus, $prefix, $v);
        return true;
    });
    return array_values($menus);
}

/**
 * 格式化后台菜单
 * @param string $prefix 路由前缀，用户区分不用模块
 * @return array
 */
function login_menus(string $prefix){
    $menus = [];
    $admin_roles = \App\Models\AdminGroup::where('id', \Illuminate\Support\Facades\Auth::user()->group_id ?? 0)->value('menus');
    collect(app('router')->getRoutes())->each(function($v) use (&$menus, $admin_roles, $prefix){
        $uri_prefix = \Illuminate\Support\Str::before($v->uri, '/');
        if($uri_prefix === $prefix && ($user = \Illuminate\Support\Facades\Auth::user()) && !empty($user->group_id) && $user->group_id != 1){
            $url = substr($v->uri, strlen($uri_prefix));
            if(!in_array($url, $admin_roles)){
                return true;
            }
        }
        parseMenus($menus, $prefix, $v);
        return true;
    });
    return array_values($menus);
}

function parseMenus(&$menus, $prefix, $v){
    $named = data_get($v, 'action.as');
    $uri_prefix = \Illuminate\Support\Str::before($v->uri, '/');
    if($uri_prefix === $prefix && stripos($named, "{$prefix}.") !== false && $named != "{$prefix}."){
        $url = substr($v->uri, strlen($uri_prefix));
        $explodes = explode('.', $named);
        $parent = $explodes[1];
        $item = $explodes[2] ?? '';
        if(empty($item) && \Illuminate\Support\Str::endsWith($named, '.')){
            return true;
        }
        $children = [
            'name'  => $item,
            'full'  => $named,
            'url'   => $url,
            'parent'=> $parent
        ];
        if(!empty($menus[$parent])){
            $menus[$parent]['children'][] = $children;
        }else{
            $menus[$parent] = [
                'name'      => $parent,
                'full'      => $named,
                'url'       => $url,
                'children'  => empty($item) ? [] : [$children],
            ];
        }
    }
    return true;
}
