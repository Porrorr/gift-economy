'use strict';
var mongoClient = require('mongodb').MongoClient;

var mongoUrl = 'mongodb://localhost:27017/gift-economy';

var stores = {};

mongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    throw new Error('Unable to connect to MongoDB, exiting\n' + err);
  }
  stores.users = db.collection('users');
  stores.gifts = db.collection('gifts');
  // TODO check for collection and create with indexes if not there
  stores.messages = db.collection('messages');

  process.on('exit', () => db.close());
});

module.exports = stores;
