var mongoClient = require('mongodb').MongoClient
;

var giftsController = {
  getHome: function(req, res) {
    mongoClient.connect('mongodb://localhost:27017/gift-economy', function(err, db) {
      // TODO Error management
      var collection = db.collection('gifts');
      collection.find({}).toArray(function(err, gifts) {
        console.log(gifts);
        res.render('gifts', { title: 'Gifts', gift: gifts});
        db.close();
      })
    });
  }
}

module.exports = giftsController;
