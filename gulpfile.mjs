import path from "path";
let __dirname = path.dirname(process.argv[1]);
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");
import gulp from 'gulp';
import autoprefixer from "gulp-autoprefixer";
import sass from "./gulp/gulp-sass/index.mjs";
// import exec from 'gulp-exec'
var exec = require('child_process').exec;

gulp.task('build:control', function (cb) {
    exec('cd ${PWD}/palette/src/github.com/zababurinsv/newkind-db/frontend/src/components/newkind-control && npm run build:module',
    function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})

gulp.task('build:aioli', function (cb) {
    exec('cd ${PWD}/palette/src/github.com/zababurinsv/newkind-db/frontend/src/modules/aioli && npm run build',
    function (err, stdout, stderr) {
          console.log(stdout);
          console.log(stderr);
          cb(err);
    });
})

gulp.task('copy:aioli', function() {
    return gulp.src('./palette/src/github.com/zababurinsv/newkind-db/frontend/src/modules/aioli/dist/aioli.worker.mjs')
      .pipe(gulp.dest('./palette/src/github.com/zababurinsv/newkind-db/frontend/src/static'));
});

gulp.task('copy', () => {
    return gulp.src(['./frontend/src/static/**/**'])
      .pipe(gulp.dest(`./service/newkind-service`));
});

gulp.task('scss', function () {
  console.log('sass ->')
    return gulp.src(`${pkg.palette.zb.scope}${pkg.palette.zb.active}/**/*.scss`)
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer({
          cascade: false
      }))
      .pipe(gulp.dest(`${pkg.palette.zb.scope}${pkg.palette.zb.active}`));
});

gulp.task('watch', () => {
    gulp.watch(`./frontend/src/static/**/**`, gulp.series('copy'))
  console.log('ddddddddddddddddd', `${pkg.palette.zb.scope}${pkg.palette.zb.active}/**/**`)
    gulp.watch(`${pkg.palette.zb.scope}${pkg.palette.zb.active}/**/**`, gulp.series('scss'))
    gulp.watch(`/home/zb/Desktop/newkind-service/palette/src/github.com/zababurinsv/newkind-db/frontend/src/components/newkind-control/src/**/**`, gulp.series('build:control'))
    gulp.watch(`/home/zb/Desktop/newkind-service/palette/src/github.com/zababurinsv/newkind-db/frontend/src/modules/aioli/src/**/**`, gulp.series('build:aioli','copy:aioli'))
});

gulp.task('default',gulp.parallel('scss','copy', 'watch'))