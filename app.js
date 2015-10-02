var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

/*
var leeCodigos=require('./lib/leecodigosError');
var respuesta;
leeCodigos(function(err,data){
  if ( err ){
    respuesta={};
  }
  respuesta=data;
});
*/
//app.respuesta=require('./lib/leeCodigosError');
//var respuesta = codigos.codes();
//console.log('app.resp=',app.respuesta);
/*
var devuelve = require('./lib/leeCodigosError');
console.log(devuelve);
var a={};
devuelve(function(err,data){
  if (err){
    console.log('error en app ',err);
    return;
  }
  a=data;
  console.log('a=',a);
});
console.log('termino');
*/



//console.log('app----',devuelve('saludo'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//incluyo MongoDB
var dbMongo=require('./lib/mongoDB.js');

app.use('/', routes);
//app.use('/users', users);

//incluyo la API V1
app.use('/apiV1/adduser', require('./routes/apiV1/adduser'));
app.use('/apiV1/adduser/adduuid',require('./routes/apiV1/adduser'));
app.use('/apiV1/adduser/authenticate', require('./routes/apiV1/validate'));
app.use('/apiV1/lista', require('./routes/apiV1/lista'));
app.use('/apiV1/tags', require('./routes/apiV1/tags'));
//app.use('./apiV1/adduser/adduuid', require('./routes/apiV1/adduser'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
