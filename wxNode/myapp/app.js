var createError = require('http-errors');
var express = require('express');
//用于处理目录的对象，提高开发效率
var path = require('path');
//加载cookie模块，用于获取web浏览器发送的cookie中的内容
var cookieParser = require('cookie-parser');
//在控制台中，显示req请求的信息
var logger = require('morgan');

//引入路由处理模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');

var app = express();

app.set('views', path.join(__dirname, 'views'));//设置VIEWS文件夹，__dirname是node.js里面的全局变量。取得执行js所在的路径
// 视图引擎设置
app.set('view engine', 'pug');

//加载日志中间件，定义日志和输出级别
app.use(logger('dev'));
//加载解析json的中间件,接受json请求
app.use(express.json());
//加载解析urlencoded请求体的中间件
app.use(express.urlencoded({ extended: false }));
//加载解析cookie的中间件
app.use(cookieParser());
//静态文件目录设置,设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

//路由控制器, 抓取url后面并引导到路由处理模块
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);

// 捕获404并转发给错误处理程序
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// 开发环境下的500错误处理器，将错误信息渲染error模版并显示到浏览器中
app.use(function(err, req, res, next) {
  // 设置局部变量，只提供开发中的错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
