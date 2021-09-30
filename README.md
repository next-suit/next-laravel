## Admin panel template

- laravel8 + rsuite5.0 + tailwindcss2 后台模版

```shell
composer install
yarn | npm i
cp .env.example .env
// 编辑数据库连接信息以及其它配置
php artisan key:generate
php artisan migrate --seed
yarn prod | npm run prod
```

- 浏览器打开 `APP_URL/admin` 访问后台
- 默认登录信息 admin/123456
