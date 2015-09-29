var express = require('express');
var router = express.Router();

router.get('/', get);
function get(req, res, next) {
  res.render('gifts', { title: 'Gifts', gift: [
    {name: 'Free thing', description: 'This thing is free'},
    {name: 'Free help', description: 'I\'ll help you all for free'}
  ]});
}

module.exports = router;
