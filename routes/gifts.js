var express = require('express');
var controller = require('../controllers/gifts');
var sessions = require('../middleware/sessions');

var app = express()
  , router = express.Router()
;

var get;
router.get('/', get = (req, res) => {
  controller.getHome(req, res);
});
var getNew;
router.get('/new', sessions.ensureLoggedIn(), getNew = (req, res) => {
  controller.getNew(req, res);
});
var post;
router.post('/', sessions.ensureLoggedIn(), post = (req, res) => {
  controller.addNew(req, res);
});

module.exports = router;
