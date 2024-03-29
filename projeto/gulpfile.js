const gulp       = require('gulp')
const concat     = require('gulp-concat')
const cssmin     = require('gulp-cssmin')
const rename     = require('gulp-rename')
const uglify     = require('gulp-uglify')
const image      = require('gulp-image')
const scripts    = require('gulp-strip-comments')
const scriptscss = require('gulp-strip-css-comments')
const htmlmin    = require('gulp-htmlmin')
const { series, parallel } = require('gulp')
const babel      = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

function tarefasCSS(callback){
    
        gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css',
             './vendor/owl/css/owl.css',
             './vendor/jquery-ui/jquery-ui.css',
             './src/css/style.css'
             ])  
    
        .pipe(scriptscss())                 // Remove os comentários     
        .pipe(concat('styles.css'))         // Mescla os arquivos     
        .pipe(cssmin())                     // Minifica os css
        .pipe(rename({ suffix: '.min'} ))   // Cria este libs.min.css 
        .pipe(gulp.dest('./dist/css'))      // Cria o arquivo no diretório ./dist

    return callback()
}


function tarefasJS(callback){

        gulp.src(['./node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './vendor/owl/js/owl.js',
            './vendor/jquery-mask/dist/jquery.mask.js',
            './vendor/jquery-ui/jquery-ui.js',
            './src/js/custom.js'
            ])

        .pipe(scripts())                    // Remove os comentários
        /*.pipe(babel({
            comments: true,
            presets: ['@babel/env']
        }))*/
        .pipe(concat('scripts.js'))         // Mescla os arquivos
        .pipe(uglify())                     // Minifica os js
        .pipe(rename({ suffix: '.min'} ))   // Cria este libs.min.js 
        .pipe(gulp.dest('./dist/js'))       // Cria o arquivo no diretório ./dist

    return callback()
}


function tarefasImagem(){

    return gulp.src('./src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images')) 
            
}

function tarefasHtml(callback){
    gulp.src('./src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))

    return callback()
}


gulp.task('serve',function(){

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./dist/*.html').on('change', reload)
})

function end(cbe){
    console.log('Tarefas concluídas!')
    return cbe()
}

const process = series(tarefasHtml, tarefasCSS, tarefasJS, end )

exports.styles  = tarefasCSS
exports.scripts = tarefasJS
exports.images  = tarefasImagem

//exports.default = series(tarefasHtml, tarefasCSS, tarefasJS )
exports.default = process


