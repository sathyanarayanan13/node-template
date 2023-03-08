var express = require('express');
var router = express.Router();

// initialize db
var db = require('../database/index')

// example database query, renders to time.ejs in ./views
router.get('/time', async function(req, res, next) {
  if (db) {
    try {
      const time = await db.any('SELECT NOW()')
      res.render('time', { time: time[0].now });
    } catch(e) {
      console.error(e)
      res.render('error', {message: e.message, error: e})
    }
  } else {
    res.render('error', {message: 'You have not passed DATABASE_URL in, this feature requires a postgres db', error: { status: '', stack: ''}})
  }
});

// index page
router.get('/', function(req, res, next) {
  res.render('index');
});

// 404 fallback
router.get('*', function(req, res){
  res.status(404)
  res.render('404')
});

module.exports = router;
