let gulp=require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('minifyImage',() =>
    gulp.src('src/static/imgs/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/static/404page')));