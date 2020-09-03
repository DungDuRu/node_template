const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const compression = require('compression');

const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const helmet = require('helmet');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');                  //템플릿 엔진 ejs
app.engine('html', require('ejs').renderFile);  //엔진 설정

app.use(
	session({
		secret: '@#@$MYSIGN#@$#$',
		resave: false,
		saveUninitialized: true,
		// cookie: {
		//   maxAge: 1000 * 60 * 60 * 24 * 30 // 쿠키 유효기간 30일
		// },
		store: new MemoryStore({ checkPeriod: 86400000 }),
	})
);

// app.use(logger('dev'));
app.use(logger('combined'));
app.use(cors(corsOptions));
app.use(compression());
app.use(helmet());              //기본적인 보안 장치, Helmet은 보안 관련 HTTP 헤더를 설정하는 다음과 같은 더 작은 크기의 미들웨어 함수 9개의 모음입니다.
app.use(helmet.noCache());

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

module.exports = app;
