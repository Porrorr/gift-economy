var express = require('express');
var sessions = require('../middleware/sessions');
var controller = require('../controllers/users');

var app = express();
var router = express.Router();

var get;
router.get('/', get = (req, res) => {
  controller.getLogin(req, res);
});

module.exports = router;
