import path from "path";
let __dirname = path.dirname(process.argv[1]);
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");
import gulp from 'gulp';
import autoprefixer from "gulp-autoprefixer";
import sass from "./gulp/gulp-sass/index.mjs";

console.log('#######', )

gulp.task('scss', function () {
    return gulp.src(`${pkg.palette.zb.scope}${pkg.palette.zb.active}/**/*.scss`)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest(`${pkg.palette.zb.scope}${pkg.palette.zb.active}`));
});

gulp.task('copy', () => {
    return gulp.src(['./frontend/src/static/**/**']).pipe(gulp.dest(`./service/newkind-service`));
});

gulp.task('watch', () => {
    gulp.watch(`./frontend/src/static/**/**`, gulp.series('copy'))
    gulp.watch(`${pkg.palette.zb.scope}${pkg.palette.zb.active}/**/**`, gulp.series('scss'))
});

gulp.task('default',gulp.parallel('copy','watch'))