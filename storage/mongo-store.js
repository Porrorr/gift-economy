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

  process.on('exit', () => db.close());
});

module.exports = stores;
