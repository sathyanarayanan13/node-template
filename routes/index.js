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

router.get('/setup', async (req, res) => {
    try {
      const createTableQuery = `
        CREATE TABLE schools (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          address VARCHAR(100)
        );
      `;
      await db.none(createTableQuery);
      res.status(200).send({ message: "Successfully created table" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

// index page
router.get('/', function(req, res, next) {
  res.render("index", {title : "Docker sample", students: []})
});

// 404 fallback
router.get('*', function(req, res){
  res.status(404)
  res.render('404')
});

module.exports = router;
