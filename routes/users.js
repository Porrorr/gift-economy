var express = require('express');
var controller = require('../controllers/users');
var sessions = require('../middleware/sessions');

var app = express();
var router = express.Router();

var signup;
router.get('/signup', sessions.ensureLoggedOut(), signup = (req, res) => {
  controller.getSignup(req, res);
});
var post;
router.post('/', sessions.ensureLoggedOut(), post = (req, res) => {
  controller.addNew(req, res);
});

module.exports = router;
