var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var db = require('./database/index');

var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', async (req, res) => {
  console.log(req.body);
  const insertDataQuery = `INSERT INTO schools (name, address) VALUES ($1, $2) RETURNING *;`;
  try {
    const { name, address } = req.body;
    db.one(insertDataQuery, [name, address])
      .then(async (result) => {
        const students = await db.any('SELECT * FROM schools')
        console.log(students);
        res.render("index", { title: "Docker sample", students: [] })
      });
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

module.exports = app;
