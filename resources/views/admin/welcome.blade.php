<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{{mix('css/admin.css')}}" rel="stylesheet" type="text/css">
    <title>{{config('app.name')}} 总后台管理</title>
    <script>
        let $APP_NAME = "{{config('app.name')}}";
        let $PAGE = 1;  // 全局表格页数
        let $ROWS = $ROWS_DEFAULT = parseInt('{{(new \App\Models\BaseModel())->getPerPage()}}'); // 全局表格行数
    </script>
</head>
<body>
<div id="root" class="h-screen"></div>
<script src="{{mix('js/admin.js')}}"></script>
</body>
</html>
