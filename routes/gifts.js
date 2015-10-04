var express = require('express')
  , controller = require('../controllers/gifts')
  , bodyParser = require('body-parser')
;
var app = express()
  , router = express.Router()
;

app.use(bodyParser.urlencoded({extended: false}));

var get;
router.get('/', get = function (req, res) {
  controller.getHome(req, res);
});
var getNew;
router.get('/new', getNew = function (req, res) {
  controller.getNew(req, res);
});
var post;
router.post('/', post = function(req, res) {
  controller.addNew(req, res);
});

module.exports = router;
