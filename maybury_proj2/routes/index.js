var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome to Fritter' });
});
router.get('/home/', function(req, res) {
  res.render('home', { title: 'Fritter | Home' });
});

module.exports = router;
