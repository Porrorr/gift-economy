var assert = require('assert');
var rewire = require('rewire');
var ObjectId = require('mongodb').ObjectId;

var controller;
var mongoClient;
var db;
var asserts;

describe('Gifts controller', () => {

  beforeEach( () => {
    asserts = {};
    controller = rewire('../../controllers/gifts');
    mongoClient = {};
    db = {};
    controller.__set__('mongoClient', mongoClient);
  });

  it('renders a homepage with mongo data', done => {
    giftData = {};
    db.collection = name => {
        assert.equal(name, 'gifts');
        return {
          find: () => {
            return {
              toArray: callback => {
                callback({}, giftData)
              }
            }
          }
        };
      },
    db.close = () => {}
    mongoClient.connect = (url, callback) => {callback({}, db)};

    controller.getHome({}, {
      render: (template, data) => {
        asserts.template = template;
        asserts.data = data;
        done();
      }
    });

    assert.strictEqual(asserts.template, 'gifts', 'Template name');
    assert.equal(asserts.data.title, 'Gifts', 'Template must have title set correctly');
    assert.equal(asserts.data.gift, giftData, 'Must pass mongo data to the template');
  })

  it('renders the new gift form in getNew', done => {
    var res = {
      render: (template, data) => {
        asserts.template = template;
        asserts.data = data;
        done();
      }
    };

    controller.getNew({}, res);

    assert.strictEqual(asserts.template, 'new', 'Template name must be correct');
    assert.equal(asserts.data.title, 'New gift creator', 'Must set page title');
  })

  it('creates new gift in addNew', done => {
    var req = {
      body: {
        name: 'name',
        description: 'desc'
      },
      user: {
        _id: '5610f326ff3051d74f4f569c',
        username: 'user1'
      }
    };
    var res = {
      redirect: url => {
        asserts.redirect = url;
      }
    };
    db.collection = col => {
      asserts.collection = col;
      return {
        insertOne: (data, callback) => {
          asserts.data = data;
          callback();
        }
      };
    };
    db.close = () => {
      done();
    }
    mongoClient.connect = (url, callback) => {callback({}, db)};

    controller.addNew(req, res);

    assert.strictEqual(asserts.collection, 'gifts');
    assert.strictEqual(asserts.data.name, req.body.name, 'Name should be set');
    assert.strictEqual(asserts.data.description, req.body.description,
            'Description should be set');
    assert(ObjectId(req.user._id).equals(asserts.data.gifterId),
            'Should set gifter id');
    assert.strictEqual(asserts.data.gifterName, req.user.username,
            'Should set username');
    assert.strictEqual(asserts.redirect, '/gifts',
            'Redirect should send to gift list');
  })
})
