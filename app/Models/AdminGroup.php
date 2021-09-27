<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class AdminGroup extends BaseModel
{
    use HasFactory;

    protected $casts = [
        'menus'     => 'array',
    ];

    public function scopeEnable($query){
        return $query->where(['status'=> 1]);
    }
}
