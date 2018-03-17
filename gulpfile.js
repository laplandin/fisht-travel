'use strict';

var  gulp              = require('gulp');
var  watch             = require('gulp-watch');
var  prefixer          = require('gulp-autoprefixer');
var  uglify            = require('gulp-uglify');
var  sourcemaps        = require('gulp-sourcemaps');
var  cssmin            = require('gulp-clean-css');
var  imagemin          = require('gulp-imagemin');
var  pngquant          = require('imagemin-pngquant');
var  browserSync       = require("browser-sync");
var  reload            = browserSync.reload;
var  rimraf            = require('rimraf');
var  plumber           = require('gulp-plumber');
var  sequence          = require('gulp-sequence');
var  less              = require('gulp-less');
var  concat            = require('gulp-concat');
var  handlebarsCompile = require('gulp-compile-handlebars');
var  rename            = require('gulp-rename');
var  svgmin            = require('gulp-svgmin');
var  svgstore          = require('gulp-svgstore');
var  typograf          = require('gulp-typograf');

var wrap               = require('gulp-wrap');
var handlebars         = require('gulp-handlebars');
var declare            = require('gulp-declare');

var browserify         = require('browserify');
var babel              = require('gulp-babel');
var babelify           = require('babelify');
var source             = require('vinyl-source-stream');

var path = {
    build: {
        //Адреса куда ложить файлы сборки
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        plugins: 'build/plugins/',
        files: 'build/download/',
        vendor: 'build/vendor/'
    },
    src: {
        //Откуда брать исходники
        html: 'src/*.html',
        js: ['src/partials/components/**/*.js'],
        css: ['src/style/main.less', 'src/font-awesome-4.7.0/css/font-awesome.min.css'],
        img: ['src/img/**/*.*', '!src/img/icon'],
        sprite: 'src/img/icon/*.svg',
        fonts: 'src/fonts/**/*.*',
        plugins: "src/plugins/**/*.*",
        files: "src/download/**/*.*",
        precompile: "./src/precompiled/*.html",
        partials: "./src/partials",
        pages: "./src/*.hbs",
        jsEntry: "./src/js/main.js"
    },
    watch: {
        //За изменениями каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        hbs: 'src/**/*.hbs',
        data: 'src/model/**/*.json',
        js: 'src/**/*.js',
        less: 'src/**/*.less',
        css: 'src/**/*.css',
        img: 'src/img/**/*.*',
        sprite: 'src/img/icon/*.svg',
        fonts: 'src/fonts/**/*.*',
        plugins: 'src/plugins/**/*.*',
        files: 'src/download/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    // tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "SoftMind"
};


gulp.task('html:build', function() {

  var arrivalDates = require('./src/model/arrival-dates.json');
  var metaInfo = require('./src/model/meta.json');
  var reviewsData = require('./src/model/reviews.json');
  var exampleData = require('./src/model/example.json');

   return gulp.src(path.src.pages) //выбор фалов по нужному пути
        .pipe(handlebarsCompile({
          arrival: arrivalDates,
          userreviews: reviewsData,
          meta: metaInfo,
          example: exampleData
        }, {
            ignorePartials: true,
            batch: [path.src.partials],
            helpers: {
              arrivalTable: function (arrival) {
                var maxLength = 0;
                var rows = [];
                var tableArrival = "";
                for (var i = 0; i < arrival.length; i++) {
                  if (arrival[i].dates.length > maxLength) {
                    maxLength = arrival[i].dates.length;
                  }
                }
                for (var i = 0; i < maxLength; i++) {
                  var row = "";
                  for (var j = 0; j < arrival.length; j++) {
                    if (arrival[j].dates[i] === undefined) {
                      arrival[j].dates[i] = "";
                    }
                    row += "<td>" + arrival[j].dates[i] + "</td>";
                  }
                  rows.push(row);
                }
                for (var i = 0; i < rows.length; i++) {
                  tableArrival += "<tr>" + rows[i] + "</tr>"
                }

                return tableArrival;
              }
            }
        }))
       .pipe(rename({
           extname: '.html'
       }))
        .pipe(typograf({locale: ['ru', 'en-US']})) //типограф
        .pipe(gulp.dest(path.build.html)) //папка назначения
        .pipe(reload({stream:true}));
});

gulp.task('js:build', function() {
    return gulp.src(path.src.js)
      .pipe(babel({
        presets: ['env', ['es2015']]
      }))
    // .pipe(uglify()) //Сжимаем js
      .pipe(concat('component.js'))
      .pipe(gulp.dest(path.build.js))
      .pipe(reload({stream:true}));
});

gulp.task("js:bundle", function() {
  return browserify(path.src.jsEntry,{
    debug: true,
    extensions: ["es6"]
  })
    .transform(babelify, {presets: ["env", "es2015"]})
    .bundle()
    .pipe(source("app.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task('css:build', function() {
    return gulp.src(path.src.css)
        .pipe(plumber())
        //.pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(cssmin({compatibility: 'ie10'}))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream:true}));
});

gulp.task("image:build", function() {
  return gulp.src(path.src.img)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo({
        plugins: [{
          cleanupAttrs: true,
          removeDoctype: true,
          removeXMLProcInst: true,
          removeComments: true,
          removeEditorsNSData: true,
          removeEmptyAttrs: true,
          removeUselessStrokeAndFill: true,
          collapseGroups: true
      }]})
    ]))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('sprite:build', function() {
  return gulp.src(path.src.sprite)
    .pipe(svgmin({
        plugins: [{
          cleanupAttrs: true,
          removeDoctype: true,
          removeXMLProcInst: true,
          removeComments: true,
          removeEditorsNSData: true,
          removeEmptyAttrs: true,
          removeUselessStrokeAndFill: true,
          collapseGroups: true,
          removeStyleElement: true,
          cleanupIDs: true,
          removeUnusedNS: true,
          removeUselessDefs: true
      }]}
    ))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('plugins:copy', function() {
    return gulp.src(path.src.plugins)
        .pipe(gulp.dest(path.build.plugins))
        .pipe(reload({stream: true}));
});

gulp.task('files:copy', function() {
    return gulp.src(path.src.files)
        .pipe(gulp.dest(path.build.files))
        .pipe(reload({stream: true}));
});

gulp.task('precompile', function() {
    return gulp.src(path.src.precompile)
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'App.templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('build', sequence([
        'clean'
    ],
    [
        'sprite:build',
        'html:build',
        'js:build',
        'js:bundle',
        'css:build',
        'fonts:build',
        'image:build',
        'plugins:copy',
        'precompile'
    ]) );

gulp.task('watch', function() {
    watch([path.watch.html, path.watch.hbs], function(event, cb) {
        gulp.start('html:build');
    });
    watch(['./src/model/*.*'], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css, path.watch.less], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start(['js:build', 'js:bundle']);
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.sprite], function(event, cb) {
        gulp.start('sprite:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.plugins], function(event, cb) {
        gulp.start('plugins:copy');
    });
    watch([path.watch.files], function(event, cb) {
        gulp.start('files:copy');
    });
});

gulp.task('webserver', function() {
    browserSync(config);
});

gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', sequence(['build'], ['webserver'], 'watch') );
