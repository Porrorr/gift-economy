'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var sessions = require('./middleware/sessions');

var routes = require('./routes/index');
var gifts = require('./routes/gifts');
var login = require('./routes/login');
var users = require('./routes/users');
var messages = require('./routes/messages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerHelper('ifGifter', function(options) {
  if (this.user && this.gift && this.gift.gifterId == this.user.id) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
sessions.setMiddleware(app);

app.use('/', routes);
app.use('/gifts', gifts);
app.use('/login', login);
app.use('/user', users);
app.use('/messages', messages);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
