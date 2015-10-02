var express = require('express')
  , controller = require('../controllers/gifts')
;
var router = express.Router();

var get;
router.get('/', get = function (req, res) {
  controller.getHome(req, res);
});
var getNew;
router.get('/new', getNew = function (req, res) {
  controller.getNew(req, res);
});

module.exports = router;
