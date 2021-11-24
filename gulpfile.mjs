import gulp from 'gulp';

gulp.task('copy', () => {
    return gulp.src(['./frontend/src/static/**/**']).pipe(gulp.dest(`./service/newkind-service`));
});

gulp.task('watch', () => { gulp.watch('./frontend/src/static/**/**', gulp.series('copy')) });

gulp.task('default',gulp.series('copy','watch' ))