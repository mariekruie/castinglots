// вытаскиваем нужные переменные из пакета gulp
const {src, dest, watch, parallel, series} = require('gulp'); 


// передаем в свои постоянные возможности нужных пакетов 
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const del           = require('del');



// прописываем поведение
function watching(){
    watch(['app/scss/**/*.scss'], styles); // при изменении scss файлов
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts); // при изменении js файлов 
    watch(['app/*.html']).on('change', browserSync.reload); // при изменении html файлов
}

function sync() {
    browserSync.init({
      server : {
        baseDir: 'app/'
      }
    });
  }

function styles(){
    return src('app/scss/style.scss') // прописывваем путь к файлу scss
        .pipe(scss({outputStyle: 'compressed'})) // минифицируем стили
        .pipe(concat('style.min.css')) // переименовываем файл 
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
          }))
        .pipe(dest('app/css')) // отправляем в папку css, которую gulp создаст сам 
        .pipe(browserSync.stream()) // отображаем изменения в браузере 
}

function scripts() {
    return src('app/js/main.js') // либо в массиве [] пути к каждой используемой библиотеке в последовательности через запятую
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(dest('app/js'))
      .pipe(browserSync.stream())
  }

  function images() {
    return src('app/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
      .pipe(dest('dist/images'))
  }

  function cleanDist() {
    return del('dist')
  }

  function build() {
    return src([
      'app/css/style.min.css',
      'app/fonts/**/*',
      'app/js/main.min.js',
      'app/*.html'
    ], {base: 'app'})
      .pipe(dest('dist'))
  }
  

// присваиваем своим командам для gulp функций
exports.watching = watching;
exports.sync = sync;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

// запускае команды параллельно 
exports.default = parallel(styles, scripts, watching, sync); //используем команду gulp
exports.build = series(cleanDist, images, build); // gulpbuild