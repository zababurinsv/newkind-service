import path from "path";
let __dirname = path.dirname(process.argv[1]);
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");
import gulp from 'gulp';
import autoprefixer from "gulp-autoprefixer";
import sass from "./gulp/gulp-sass/index.mjs";

//   `.${pkg.palette.zb.scope}/static`,
//  `./palette/src/github.com/zababurinsv/static/html/components/auction-card/template/default/**/*.scss`,
//  `.${pkg.palette.zb.scope}/static/html/components/auction-card/template/default/**/*.scss`,

gulp.task('scss', function () {
    return gulp.src([
      `.${pkg.palette.zb.scope}/static/html/components/auth-card/template/**/*.scss`
    ])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest(`.${pkg.palette.zb.scope}/static/html/components/auth-card/template`));
});

gulp.task('watch', () => {
    gulp.watch([
      `.${pkg.palette.zb.scope}/static/html/components/auth-card/template/**/*.scss`
    ], gulp.series('scss'))
});

gulp.task('default',gulp.parallel('scss', 'watch'))