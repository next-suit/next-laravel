const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/admin/admin.jsx', 'public/js').react()
    .less('resources/sass/admin.less', 'public/css', {
        lessOptions: {
            javascriptEnabled: true,
        }
    });

if (mix.inProduction()) {
    mix.version()
} else {
    mix.sourceMaps()
}

mix.disableNotifications();
