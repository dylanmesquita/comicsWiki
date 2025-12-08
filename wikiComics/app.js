require('dotenv').config();  // TEM QUE SER A PRIMEIRA LINHA
const cloudinary = require('cloudinary').v2;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar com MongoDB:', err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var characterRouter = require('./routes/crcter');

// Cloudinary PRIMEIRO, antes das rotas
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

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
app.use(function(req, res, next) {
  next(createError(404));
});

// Handler de erro
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// require('dotenv').config();
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var mongoose = require('mongoose');
// const router = express.Router();

// mongoose.connect(process.env.MONGO_URI).then(() => {
//   console.log('Conectado ao MongoDB' );
// }).catch(err => {
//   console.error('erro ao conectar com MongoDB:', err);
// });

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var characterRouter = require('./routes/crcter');

// var app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/characters', characterRouter);

// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.use(function(err, req, res, next) {

//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   res.status(err.status || 500);
//   res.render('error');
// });

// const cloudinary = require('cloudinary').v2
// const dotenv = require("dotenv");
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_SECRET
// });

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

// router.post("/characters/new", upload.single("image"), async (req, res) => {
//     console.log(req.file); // deve mostrar info do arquivo
// });


// module.exports = app;
