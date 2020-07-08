const gulp = require('gulp');
const gulp_concat = require('gulp-concat');
const gulp_rename = require('gulp-rename');
const gulp_uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const minifyCSS = require('gulp-minify-css');
const gp_sourcemaps = require('gulp-sourcemaps');

// Sass
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

// Include JS Files
var jsFiles = require('./plugins/js-files');
    jsFiles = jsFiles.map(i => './public/' + i);

// Include CSS Files
var cssFiles = require('./plugins/css-files');
    cssFiles = cssFiles.map(i => './public/' + i);

// Dest: or any folder inside your public asset folder
// Tmp: any place where you want to store the concatenated, but unuglified/beautified files
const dirs = {
    js: {
        dest: './public/javascripts/dist/',
        tmp: './public/javascripts/dist/'
    },
    css: {
        dest: './public/assets/',
        tmp: './public/assets/'
    },
    sass: {
        src: './public/sass/*.sass',
        dest: './public/sass'
    }
}

//To concat and Uglify All JS files in a particular folder
gulp.task('js', function(){
    return gulp
        .src(jsFiles) //Use wildcards to select all files in a particular folder or be specific
        .pipe(gp_sourcemaps.init())
        .pipe(gulp_concat('concat.js')) //this will concat all the files into concat.js
        .pipe(gulp.dest(dirs.js.tmp)) //this will save concat.js in a temp directory defined above
        .pipe(gulp_rename('dist.min.js')) //this will rename concat.js to uglify.js
        .pipe(gulp_uglify()) //this will uglify/minify uglify.js
        .pipe(gp_sourcemaps.write('./'))
        .pipe(gulp.dest(dirs.js.dest)); //this will save uglify.js into destination Directory defined above
});

// gulp.task('sass', function () {
//   return gulp
//         .src(dirs.sass.src)
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gp_sourcemaps.init())
//         .pipe(gp_sourcemaps.write('./'))
//         .pipe(uglifycss()) //uglify uglify.css file
//         .pipe(minifyCSS())
//         .pipe(gulp.dest(dirs.sass.dest));
// });

// gulp.task('sass:watch', function () {
//   return gulp
//         .watch(
//             dirs.sass.src,
//             gulp.series('sass')
//         );
// });

// To Concat and Uglify all CSS files in a particular folder
gulp.task('css', function () {
  return gulp
    .src(cssFiles) //Use wildcards to select all files in a particular folder or be specific
    .pipe(gulp_concat('concat.css')) //this will concat all the source files into concat.css
        .pipe(gulp.dest(dirs.css.tmp)) //this will save concat.css into a temp Directory
        .pipe(gulp_rename('dist.min.css')) //this will rename concat.css into uglify.css, but will not replace it yet.
    .pipe(uglifycss()) //uglify uglify.css file
    .pipe(minifyCSS())
    .pipe(gulp.dest(dirs.css.dest)); //save uglify.css
});

// Start Both tasks
gulp.task('uglify', function(){
    gulp.task('js');
    gulp.task('css');
});
