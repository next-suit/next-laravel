<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable {
    use Notifiable, HasApiTokens;

    protected $guarded = [];
    protected $hidden = ['password', 'order_resolve_password', 'authenticator_secret'];

    public function isSuper(){
        $group_id = $this->getAttribute('group_id');
        return $group_id === 1;
    }

    public function group(){
        return $this->belongsTo(AdminGroup::class);
    }
}
