
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');



var routes = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var product = require('./routes/product');
var mail = require('./routes/mail');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//code for bcrypt
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';





// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(session({secret: 'ssshhh '}));

app.use(session({ 
	 cookieName: 'session',
	 secret: 'cmpe273_test_string',
	 duration: 30 * 60 * 1000,
	 activeDuration: 5 * 60 * 1000,
	}));


app.use('/', routes);
app.use('/users', users);



app.post('/checklogin',home.afterSignIn);
//app.post('/buy',product.buy);
app.get('/signin', home.signin);


app.get('/signout', home.logout);
app.post('/afterSignIn',home.afterSignIn);
app.get('/afterSignIn',home.login);
app.get('/getAllUsers',home.getAllUsers);
//app.get('/buy',home.getAllUsers);
app.get('/register', home.register);
app.post('/registeruser', home.registeruser);
app.post('/sell',home.sell);
app.post('/buy',home.buy);
app.post('/addToCart',home.addToCart);
app.post('/cart',home.cart);
app.post('/purchase',home.purchase);
app.post('/history',home.history);
app.post('/yourads',home.yourads);
app.post('/info',home.info);
app.post('/info1',home.info1);
app.post('/sendMail',mail.sendMail);






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
