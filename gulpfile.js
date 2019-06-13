/**
 * Paths to project folders
 */

var paths = {
    input: 'src/',
    output: './',
    html: 'examples/',
    scripts: {
        input: 'src/**/*.js',
        polyfills: '.polyfill.js',
        output: './assets/'
    },
    styles: {
        input: 'src/**/*.{scss,sass}',
        output: './assets/css/'
    },
    svgs: {
        input: 'src/img/**/*.svg',
        output: './assets/img/'
    },
    img: {
        input: 'src/img/**/*.*',
        output: './assets/img/'
    },
    favicon: {
        input: 'src/favicon/favicon.png',
        output: './favicon/'
    },
    copy: {
        input: 'src/**/*.{ttf,woff,woff2,eot}',
        output: './assets/fonts/'
    },
    reload: './'
};


/**
 * Template for banner to add to file headers
 */

var banner = {
    full:
        '/*!\n' +
        ' =========================================================\n' +
        ' * <%= package.title %> v<%= package.version %>\n' +
        ' =========================================================\n' +
        ' * <%= package.description %>\n' +
        ' * Product page: <%= package.author.url %>\n' +
        ' * Copyright ' + new Date().getFullYear() + ' <%= package.author.name %>\n' +
        ' * <%= package.license %> License\n' +
        ' * <%= package.repository.url %>/blob/master/LICENSE.md\n' +
        ' =========================================================\n' +
        ' * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. \n' +
        ' */\n\n'
};

/**
 * Gulp Packages
 */

// General
var {src, dest, watch, series, parallel} = require('gulp');
var flatmap = require('gulp-flatmap');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var header = require('gulp-header');
var package = require('./package.json');

// Scripts
var concat = require('gulp-concat');
var uglify = require('gulp-terser');
var optimizejs = require('gulp-optimize-js');

// Styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-cssnano');

// SVGs
var svgmin = require('gulp-svgmin');

// Images
var imagemin = require('gulp-imagemin');

// BrowserSync
var browserSync = require('browser-sync');

// Favicons
var favicons = require('gulp-favicons');


// Repeated JavaScript tasks
var jsTasks = lazypipe()
    .pipe(header, banner.full, {package: package})
    .pipe(optimizejs)
    .pipe(dest, paths.scripts.output)
    .pipe(rename, {suffix: '.min'})
    .pipe(uglify)
    .pipe(optimizejs)
    .pipe(header, banner.full, {package: package})
    .pipe(dest, paths.scripts.output);

// Lint, minify, and concatenate scripts
var buildScripts = function () {

    // Run tasks on script files
    return src(paths.scripts.input)
        .pipe(flatmap(function (stream, file) {

            // If the file is a directory
            if (file.isDirectory()) {

                // Setup a suffix variable
                var suffix = '';

                // If separate polyfill files enabled
                if (settings.polyfills) {

                    // Update the suffix
                    suffix = '.polyfills';

                    // Grab files that aren't polyfills, concatenate them, and process them
                    src([file.path + '/*.js', '!' + file.path + '/*' + paths.scripts.polyfills])
                        .pipe(concat(file.relative + '.js'))
                        .pipe(jsTasks());

                }

                // Grab all files and concatenate them
                // If separate polyfills enabled, this will have .polyfills in the filename
                src(file.path + '/*.js')
                    .pipe(concat(file.relative + suffix + '.js'))
                    .pipe(jsTasks());

                return stream;

            }

            // Otherwise, process the file
            return stream.pipe(jsTasks());

        }));

};

// Process, lint, and minify Sass files
var buildStyles = function () {

    // Run tasks on all Sass files
    return src(paths.styles.input)
        .pipe(sass({
            outputStyle: 'expanded',
            sourceComments: true
        }))
        .pipe(prefix({
            overrideBrowserslist: ['last 2 version', '> 0.25%'],
            cascade: true,
            remove: true
        }))
        .pipe(header(banner.full, {package: package}))
        .pipe(dest(paths.styles.output))
        .pipe(rename({suffix: '.min'}))
        .pipe(minify({
            minifyFontValues: false,
            discardUnused: false,
            discardComments: {
                removeAll: true
            },
        }))
        .pipe(header(banner.full, {package: package}))
        .pipe(dest(paths.styles.output));

};

// Optimize SVG files
var buildSVGs = function () {

    // Optimize SVG files
    return src(paths.svgs.input)
        .pipe(svgmin())
        .pipe(dest(paths.svgs.output));

};

// Optimize image files
var buildImg = function () {

    // Optimize SVG files
    return src(paths.img.input)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(dest(paths.img.output));

};

// Generate favicons
var buildFavicons = function () {

    // Optimize SVG files
    return src(paths.favicon.input)
        .pipe(
            favicons({
                appName: '<%= package.title %>',
                appShortName: 'Bamburgh',
                appDescription: '<%= package.description %>',
                developerName: 'UiFort',
                developerURL: 'https://uifort.com/',
                background: '#ffffff',
                path: 'favicon/',
                url: '<%= package.author.url %>/',
                display: 'standalone',
                dir: "auto",
                orientation: 'any',
                scope: '/',
                start_url: '/',
                version: 1.0,
                logging: false,
                html: 'index.html',
                pipeHTML: true,
                replace: true,
                icons: {
                    android: false,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    appleIcon: false,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    appleStartup: false,         // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    coast: false,                // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    windows: false,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    yandex: false                // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                }
            })
        )
        .pipe(dest(paths.favicon.output));

};

// Copy static files into output folder
var copyFiles = function () {

    // Copy static files
    return src(paths.copy.input)
        .pipe(dest(paths.copy.output));

};

// Watch for changes to the src directory
var startServer = function (done) {

    // Initialize BrowserSync
    browserSync.init({
        server: true
    });

    // Signal completion
    done();

};

// Reload the browser when files change
var reloadBrowser = function (done) {
    browserSync.reload();
    done();
};

// Watch for changes
var watchSource = function (done) {
    watch([paths.input, paths.html, 'index.html'], series(exports.build, reloadBrowser));
    done();
};


/**
 * Export Tasks
 */

// Default task
// gulp
exports.default = series(
    watchSource,
    startServer
);

exports.build = series(
    parallel(
        buildScripts,
        buildStyles,
        buildImg,
        copyFiles,
        buildSVGs,
        buildFavicons
    )
);
