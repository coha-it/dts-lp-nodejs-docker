var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {
    title: 'Dreamteam Survey',
    jsFiles: require('../plugins/js-files'),
    cssFiles: require('../plugins/css-files')
  });
});

module.exports = router;
