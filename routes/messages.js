var express = require('express');
var controller = require('../controllers/messages');
var sessions = require('../middleware/sessions');

var app = express()
  , router = express.Router()
;

var get;
router.get('/', sessions.ensureLoggedIn(), get = (req, res) => {
  controller.get(req, res);
});

module.exports = router;
