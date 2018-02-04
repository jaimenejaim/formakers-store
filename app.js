const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const users = require('./routes/users');
const manufacturers = require('./routes/manufacturers');
const categories = require('./routes/categories');
const products = require('./routes/products');

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());



app.use('/', index);
app.use('/auth', auth);
app.use('/users', users);
app.use('/manufacturers', manufacturers);
app.use('/categories', categories);
app.use('/products', products);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.json({ errorMessage : err.message });
});

module.exports = app;
