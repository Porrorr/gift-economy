var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var mongoUrl = 'mongodb://localhost:27017/gift-economy';

var giftsController = {
  getHome: (req, res) => {
    mongoClient.connect(mongoUrl, (err, db) => {
      // TODO Error management
      var collection = db.collection('gifts');
      collection.find({}).toArray( (err, gifts) => {
        res.render('gifts', { title: 'Gifts', gift: gifts});
        db.close();
      })
    });
  },
  getNew: (req, res) => {
    res.render('new', {title: 'New gift creator'});
  },
  addNew: (req, res) => {
    mongoClient.connect(mongoUrl, (err, db) => {
      //TODO Error management
      db.collection('gifts').insertOne({
        //TODO Make sure body-parser sanitises inputs
        name: req.body.name,
        description: req.body.description,
        gifterId: ObjectId(req.user._id),
        gifterName: req.user.username
      }, (err, result) => {
        //TODO check result
        res.redirect('/gifts');
        db.close();
      });
    })
  }
}

module.exports = giftsController;
