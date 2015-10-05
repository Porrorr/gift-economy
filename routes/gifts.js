var express = require('express')
  , controller = require('../controllers/gifts')
  , bodyParser = require('body-parser')
;
var app = express()
  , router = express.Router()
;

app.use(bodyParser.urlencoded({extended: false}));

var get;
router.get('/', get = (req, res) => {
  controller.getHome(req, res);
});
var getNew;
router.get('/new', getNew = (req, res) => {
  controller.getNew(req, res);
});
var post;
router.post('/', post = (req, res) => {
  controller.addNew(req, res);
});

module.exports = router;
