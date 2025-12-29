require('dotenv').config();  // TEM QUE SER A PRIMEIRA LINHA

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
console.log('Attempting to connect to MongoDB...');
console.log('URI defined?', !!uri);
if (uri) console.log('URI starts with:', uri.substring(0, 15) + '...');

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => {
    console.error('Erro ao conectar com MongoDB:', err);
    console.error('Connection error details:', JSON.stringify(err, null, 2));
  });

mongoose.connection.on('error', err => console.error('Mongoose runtime error:', err));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var characterRouter = require('./routes/crcter');



var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/characters', characterRouter);

// 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Handler de erro
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
