var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require ('passport');
var expressValidator = require('express-validator');
var bcrypt = require ('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require("nodemailer");
var async = require("async");


//var bodyParser = require('body-parser');
var app = express();
//var contentTypeOverride = require('express-content-type-override');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');


//app.use(bodyParser.urlencoded({ extended: true }));

//app.use(function(req,res,next) { console.dir(req.body); next(); });
//app.use(bodyParser.json());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
 secret: 'keyboard cat',
 resave: false,
 saveUninitialized: true,
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());


app.use('/', indexRouter);
// // app.use('/users', user);
app.post('/send', (req, res) => {
  // Instantiate the SMTP server
  console.log('one')
  const GMAIL_USER = process.env.GMAIL_USER
  const GMAIL_PASS = process.env.GMAIL_PASS
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "sdpconsult2019@gmail.com",
      pass: "MenaKhodeir2019"
    }
  })
  console.log('2')

  const mailOpts = {
    from: req.body.email, 
    to: 'sdpconsult2019@gmail.com',
    subject: 'New message from '+req.body.fname,
    html: "From:    "+ req.body.email+" : " +req.body.message
  }
  console.log(req.body)

  smtpTrans.sendMail(mailOpts, (error, response) => {
  	  console.log("3")

    if (error) {
    	console.log(error.message)
    }
    else{
 
        res.redirect('/');
    }
    
  })
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })
let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
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
