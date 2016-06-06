/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

// Just making paths a little shorter
var jsAssetsPath = './resources/assets/js'

// Requirements
var elixir = require('laravel-elixir');
var gulp = require('gulp');

require('laravel-elixir-webpack-ex');

// Elixir extension to clean up for multiple Vue projects
elixir.extend('buildVueProject', function(mix, projectName, entryPath, configPath) {

  var project = {}
  project[projectName] = entryPath
  mix.webpack(project, require(configPath), elixir.config.publicPath);

});

elixir(function(mix) {
    if(elixir.config.production) {
        mix.sass('app.scss')
        .buildVueProject(
            mix,
            'tasks',
            '/tasks/src/main.js',
            jsAssetsPath + '/tasks/build/webpack.prod.conf.js'
        );

        // Let's let elixer take care of the hashing
        mix.version([
            'public/css/tasks.css',
            'public/js/tasks.js'
        ]);
    } else {
        mix.sass('app.scss')
        .browserSync({
            proxy           : "todo.app",
            logPrefix       : "Todo App Launch!",
            logConnections  : false,
            reloadOnRestart : false,
            notify          : false,
            ui: false,
            port: 3000,
            host: "192.168.15.15"
        });
    }
});