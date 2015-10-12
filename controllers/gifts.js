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
  getOne(req, res, next) {
    // TODO Extract store out to separate module and pool connection properly
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
      res.redirect('/gifts');
    } else {
      var id = ObjectId(req.params.id);
      mongoClient.connect(mongoUrl, (err, db) => {
        var collection = db.collection('gifts');
        collection.findOne({ _id: id }, (err, gift) => {
          if (err || !gift) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
          } else {
            res.render('giftDetail', {title: gift.name, gift: gift});
          }
        })
      })
    }
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
