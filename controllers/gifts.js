'use strict';
var ObjectId = require('mongodb').ObjectId;

var store = require('../storage/mongo-store');

var giftsController = {
  getHome: (req, res) => {
    store.gifts.find({}).toArray( (err, gifts) => {
      res.render('gifts', { title: 'Gifts', gift: gifts});
    })
  },
  getOne(req, res, next) {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
      res.redirect('/gifts');
    } else {
      store.gifts.findOne({ _id: new ObjectId(req.params.id) }, (err, gift) => {
        if (err || !gift) {
          var error = new Error('Not Found');
          error.status = 404;
          next(error);
        } else {
          let data = {
            title: gift.name,
            gift,
          }
          if (req.user) {
            data.user = {
              id: req.user._id,
              username: req.user.username
            }
          }
          res.render('giftDetail', data);
        }
      })
    }
  },
  delete(req, res) {
    if (!req.params.id || !ObjectId.isValid(req.params.id)) {
      res.redirect('/gifts');
    } else {
      store.gifts.deleteOne({
        _id: new ObjectId(req.params.id),
        gifterId: new ObjectId(req.user._id)
      }, (err, gift) => {
        // TODO Error management
        if (gift) {
          // TODO Change to modal
          res.sendStatus(204);
        }
      })
    }
  },
  getNew: (req, res) => {
    res.render('new', {title: 'New gift creator'});
  },
  addNew: (req, res) => {
    store.gifts.insertOne({
      //TODO Make sure body-parser sanitises inputs
      name: req.body.name,
      description: req.body.description,
      gifterId: ObjectId(req.user._id),
      gifterName: req.user.username
    }, (err, result) => {
      //TODO check result
      res.redirect('/gifts');
    });
  }
}

module.exports = giftsController;
