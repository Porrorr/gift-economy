var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
router.get('/logout', (req, res) => {
  res.redirect('/login/logout');
})

module.exports = router;
