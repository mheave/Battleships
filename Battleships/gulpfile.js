var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('concat', function () {
    return gulp.src('./Scripts/Typescript/*.js')
        .pipe(concat('BattleshipConcat.js'))
        .pipe(gulp.dest('./Scripts/JS/'))
});