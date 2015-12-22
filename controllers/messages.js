'use strict';
var ObjectId = require('mongodb').ObjectId;

var store = require('../storage/mongo-store');

var usersController = {
  get(req, res) {
    store.messages.find({  })
          .toArray((err, messages) => {
      console.log(`${new ObjectId(req.user._id)} has these messages: ${messages}`);
      res.render('messages', {
        title: 'Inbox',
        messages,
        user: {
          id: req.user._id,
          username: req.user.username
        }
      });
    });
  }
}

module.exports = usersController;
