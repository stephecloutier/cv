// // Définition des dépendances dont on a besoin pour exécuter les tâches
//
// var
//     gulp = require('gulp'),
//     sass = require('gulp-sass');
//
//
// // Définition de quelques variable générales pour notre gulpfile
//
// var
//     source = 'sources/',
//     dest = 'assets/';
//
//
// // Définition de quelques variables liées à nos tâches (options de tâches)
//
// var
//     css = {
//         in: source + 'scss/main.scss',
//         watch: [source + 'scss/**/*'],
//         out: dest + 'css/',
//         sassOpts: {
//             outputStyle: 'nested',
//             precision: 3,
//             errLogToConsole: true
//         }
//     };
//
// // Définition des tâches
//
// gulp.task('sass', function() {
//     return gulp.src(css.in)
//         .pipe(sass(css.sassOpts))
//         .pipe(gulp.dest(css.out));
// });
//
// // Tâche par défaut
//
// gulp.task('default', function(){
//     gulp.watch(css.watch, ['sass']);
// });


var gulp = require("gulp"),
    image = require("gulp-image"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    csso = require("gulp-csso"),
    babel = require("gulp-babel"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();

// --- Tasks for images

    gulp.task("images", function() {
        gulp.src("src/images/**/*")
            .pipe(image({
                mozjpeg: false,
                jpegoptim: false
            }))
            .pipe(gulp.dest("assets/images"));
   });

// --- browserSync task

gulp.task("sync", ['css'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("src/sass/**/*.scss", ['css']);
    gulp.watch("../index.html").on("change", browserSync.reload);
});

// --- Tasks for styles

    gulp.task("css", function() {
        gulp.src("src/sass/**/*.scss")
            .pipe(sourcemaps.init())
                .pipe(sass().on("error", sass.logError))
                .pipe(autoprefixer())
                //.pipe(csso())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("assets/css"))
            .pipe(browserSync.stream());
   });

// --- Tasks for js

    gulp.task("js", function(){
        gulp.src("src/js/**/*.js")
            .pipe(babel())
            .pipe(gulp.dest("assets/js"))
    })

// --- Watch tasks

    gulp.task("watch", function(){
        //gulp.watch("src/images/**", ["images"]);
        gulp.watch("src/sass/**/*.scss", ["css"]);
        gulp.watch("src/js/**/*.js", ["js"]);
   });

// --- Aliases

    gulp.task("default", ["sync", "css", "js"]);
    gulp.task("work", ["default", "watch"]);
