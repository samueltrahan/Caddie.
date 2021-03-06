var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
require('dotenv').config();
require('./config/database');
require('./config/passport');

var indexRouter = require('./routes/index');
const coursesRouter = require('./routes/courses');
const reviewRouter = require('./routes/reviews');
const scoreRouter = require('./routes/score');
var usersRouter = require('./routes/users');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Caddie',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/', scoreRouter);
app.use('/', reviewRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404).send('/error');
});



module.exports = app;