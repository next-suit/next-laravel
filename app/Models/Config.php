<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config extends BaseModel
{
    use HasFactory;

    const TYPES = [
        'string' => '字符串',
        'number' => '数字',
        'onoff' => '开关',
        'date' => '日期',
        'datetime' => '日期+时间',
    ];

    protected $appends = ['type_name'];

    /**
     * 设置/新增一个配置
     * @param string $key
     * @param        $value
     * @return Builder|Model
     */
    public static function set(string $key, $value){
        if(is_array($value)){
            $value = json_encode($value);
        }
        $Data = (new static())->newQuery()->updateOrCreate(['key'=> $key], ['value'=> $value]);
        return $Data;
    }

    public function getTypeNameAttribute(){
        $type = $this->getAttribute('type') ?? 'string';
        return self::TYPES[$type];
    }
}
