<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\AdminGroup;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $AdminGroup = AdminGroup::create([
            'name' => '超级管理员',
            'menus' => [],
            'status' => 1,
        ]);
        Admin::create([
            'group_id' => $AdminGroup->id,
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('123456'),
            'status' => 1,
        ]);
    }
}
