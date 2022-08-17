var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const config = require('./config')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('oooooo====', new Date().getTime())

const fs = require('fs')

var timer = ''

// fs.writeFileSync('C:\\文件\\txt\\test.txt', JSON.stringify({time: '123456'}))

let timeFileExistSign = fs.existsSync(config.saveTimeFilePath)

console.log('time-file-is-exist', timeFileExistSign)
if (timeFileExistSign) {
  readFile()
} else {
  writeFile()
  checkTimer()
}

function readFile () {
  fs.readFile(config.saveTimeFilePath, 'utf-8', function(err, data) {
    if (data) {
      const fileData = JSON.parse(data)
      compareTime(fileData.time)
      console.log('have - data', fileData.time)
    } else {
      console.log('no data, save now to file, set interval')
      writeFile()
      checkTimer()
    }
  })
}

function writeFile () {
  fs.writeFileSync(config.saveTimeFilePath, JSON.stringify({time: new Date().getTime()}))
}

function compareTime(fileTime) {
  const now = new Date().getTime()
  if ((now - fileTime) > config.thresholdTime) {
    associationFunc()
    console.log('time is up, delete file, save time, set interval.')
  } else {
    setTimeout(() => {
      associationFunc()
      console.log('time is not arrive, set diff time, delete file, save time, set interval.')
    }, config.thresholdTime - (now - fileTime))
  }
}

function deleteFile (path) {
  console.log('file is deleted', path)
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      let files = fs.readdirSync(path)
      files.forEach((file, index) => {
        let currentPath = path + "/" + file
        if (fs.statSync(currentPath).isDirectory()) {
          delFile(currentPath)
      } else {
          fs.unlinkSync(currentPath)
      }
      })
    } else {
      fs.unlinkSync(path)
    }
  } else {
    console.log('this file do not exist')
    writeFile()
    checkTimer()
  }
}

function associationFunc () {
  deleteFile(config.filePath)
  writeFile()
  checkTimer()
}

function checkTimer () {
  if (!timer) {
    initTimer()
  } else {
    clearInterval(timer)
    timer = ''
    initTimer()
  }
}

function initTimer () {
  timer = setInterval(() => {
    console.log('This is a interval. ')
    deleteFile(config.filePath)
    writeFile()
  }, config.thresholdTime)
}

module.exports = app;
