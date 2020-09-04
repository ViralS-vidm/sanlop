const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
var browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const packageInfo = require('./package.json');
const wiredep = require('wiredep').stream;

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const banner = [
    '/*!',
    ' * <%= package.name %>',
    ' * <%= package.title %>',
    ' * <%= package.url %>',
    ' * @author <%= package.author %>',
    ' * @version <%= package.version %>',
    ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.',
    ' */',
].join('\n');

gulp.task('img', () => {
    return gulp.src('src/img/**/*')
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest('build/assets/img'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) { })
        .concat('src/font/**/*'))
        .pipe(gulp.dest('build/assets/font'));
});


gulp.task('styles', () => {
    return gulp.src('src/css/*.scss')
        .pipe($.plumber())
        .pipe($.sass.sync({ outputStyle: 'expanded', precision: 10, includePaths: ['.'] }).on('error', $.sass.logError))
        .pipe($.autoprefixer({ browsers: ['> 0%'] }))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(reload({
            stream: true
        }))
        .pipe(browserSync.stream());
});


gulp.task('js', () => {
    return gulp.src('src/js/*.js')
        .pipe($.plumber())
        .pipe($.babel())
        .pipe($.header(banner, { package: packageInfo }))
        .pipe(gulp.dest('build/assets/js'))
        .pipe(browserSync.stream());
});

gulp.task('wiredep', () => {
    return gulp.src('src/templates/layouts/*.njk')
        .pipe($.plumber())
        .pipe(wiredep({
            exclude: [''],
            ignorePath: /^(\.\.\/)*\.\./,
            fileTypes: {
                njk: {
                    block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                    detect: {
                        js: /<script.*src=['"]([^'"]+)/gi,
                        css: /<link.*href=['"]([^'"]+)/gi
                    },
                    replace: {
                        js: '<script src="{{filePath}}"></script>',
                        css: '<link rel="stylesheet" href="{{filePath}}" />'
                    }
                }
            }
        }))
        .pipe(gulp.dest('src/templates/layouts'))
        .pipe(browserSync.stream());
});

gulp.task('views', () => {
    return gulp.src('src/templates/*.njk')
        .pipe($.plumber())
        .pipe($.nunjucksRender({ path: 'src/templates' }))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
});

gulp.task('useref', ['views', 'styles', 'js'], () => {
    return gulp.src(['build/*.html'])
        .pipe($.useref({
            searchPath: ['./build', './', 'bower_components']
        }))
        .pipe($.if(/\.js$/, $.uglify({
        })))
        .pipe($.if(/\.css$/, $.cssnano({
            safe: true,
            autoprefixer: false
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', () => {
    runSequence(['wiredep'], [
        'useref', 'img', 'fonts'
    ], () => {
        return gulp.src([
            'build/**/*',
            '!build/*.html',
            '!build/**/*.js',
            '!build/**/*.css'
        ]).pipe($.size({
            title: 'build',
            gzip: true
        })).pipe(gulp.dest('dist'));
    });
});

gulp.task('serve', () => {
    runSequence(['wiredep'], [
        'views', 'styles', 'js', 'img', 'fonts'
    ], () => {
        browserSync.init({
            notify: false,
            port: 8000,
            server: {
                baseDir: ['build', './']
            },
            routes: {
                '/bower_components': 'bower_components'
            }
        });
    });


    gulp.watch([
        'src/img/**/*'
    ]).on('change', reload);

    gulp.watch('src/**/*.{html,njk}', ['views']);
    gulp.watch('src/css/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/fonts/**/*', ['fonts']);
    gulp.watch('src/img/**/*', ['img']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
});



/*gulp.task('serve', gulp.series('views', 'styles', 'js', 'img', 'fonts'),() => {
    browserSync.init({
        notify: false,
        port: 8000,
        server: {
            baseDir: ['build', './']
        },
        routes: {
            '/bower_components': 'bower_components'
        }
    });

    gulp.watch([
        'src/img/!**!/!*'
    ]).on('change', reload);

    gulp.watch('src/!**!/!*.{html,njk}', ['views']);
    gulp.watch('src/styles/!**!/!*.scss', ['styles']);
    gulp.watch('src/js/!**!/!*.js', ['js']);
    gulp.watch('src/fonts/!**!/!*', ['fonts']);
    gulp.watch('src/img/!**!/!*', ['img']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
});*/

gulp.task('default', ['serve']);
