var express = require('express')
  , controller = require('../controllers/gifts')
;
var router = express.Router();

router.get('/', get);
function get(req, res, next) {
  controller.getHome(req, res);
}

module.exports = router;
