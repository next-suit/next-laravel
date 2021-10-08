## Admin panel template

- laravel8 + rsuite5.0 + tailwindcss2 后台模版
- 使用 laravel-mix 编译前端文件，后台数据使用api互通

```shell
// 运行 composer
composer install

// 安装 node_modules
yarn || npm i

// 拷贝配置文件并修改数据库连接信息以及其它配置
cp .env.example .env

// 初始化操作
php artisan key:generate
php artisan storage:link
php artisan ebank:purse-init

// 运行数据库迁移并生成默认登录用户
php artisan migrate --seed

// 编译前端文件
yarn prod || npm run prod
```

- 浏览器打开 `APP_URL/admin` 访问后台
- 默认登录信息 admin/123456

#### 如何修改主题 ？
- 编辑 `resource/scss/admin.less` 内变量
#### 如何增加权限菜单
- 编辑 `resource/routes/admin.php` 使用 name 添加

## 截图

![登录页](https://raw.githubusercontent.com/yybawang/images/master/picgo20211008174728.png)
![配置页](https://raw.githubusercontent.com/yybawang/images/master/picgo20211008174950.png)
![](https://raw.githubusercontent.com/yybawang/images/master/picgo20211008175036.png)
