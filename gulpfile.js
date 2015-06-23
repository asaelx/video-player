var gulp            = require('gulp'),
    jade            = require('gulp-jade'),
    sass            = require('gulp-ruby-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    livereload      = require('gulp-livereload');

gulp.task('templates', function(){
    return gulp.src('assets/jade/*.jade')
            .pipe(jade({pretty: true}))
            .pipe(gulp.dest('./'));
});

gulp.task('styles', function(){
    return sass('assets/sass/player.sass', {style: 'compressed'})
            .on('error', function(err){
                console.error('Error! ', err.message);
            })
            .pipe(autoprefixer())
            .pipe(gulp.dest('assets/css'));
});

gulp.task('scripts', function(){
    return gulp.src('assets/js/*.js')
            .pipe(concat('scripts.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('assets/js/min'));
});

gulp.task('default', function(){
    gulp.watch('assets/jade/**/*.jade', ['templates']);
    gulp.watch('assets/sass/*.sass', ['styles']);
    gulp.watch('assets/js/*.js', ['scripts']);
});
