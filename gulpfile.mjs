import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");
import gulp from 'gulp';
import autoprefixer from "gulp-autoprefixer";
import sass from "./gulp/gulp-sass/index.mjs";
import wait from 'gulp-wait'

gulp.task('scss', function () {
    return gulp.src([`.${pkg.palette.zb.scope}/static/html/components/**/*.scss`])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest(`.${pkg.palette.zb.scope}/static/html/components`));
});

gulp.task('watch',  () => {
    gulp.watch([`.${pkg.palette.zb.scope}/static/html/components/**/*.scss`], gulp.series('scss'))
});

gulp.task('default',gulp.series('scss', 'watch'))