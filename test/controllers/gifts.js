var assert = require('assert');
var rewire = require('rewire');

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
        assert.strictEqual(template, 'gifts', 'Template name');
        assert.equal(data.title, 'Gifts', 'Template must have title set correctly');
        assert.equal(data.gift, giftData, 'Must pass mongo data to the template');
        done();
      }
    });
  })

  it('renders the new gift form in getNew', done => {
    var res = {
      render: (template, data) => {
        assert.strictEqual(template, 'new', 'Template name must be correct');
        assert.equal(data.title, 'New gift creator', 'Must set page title');
        done();
      }
    };
    controller.getNew({}, res);
  })

  it('creates new gift in addNew', done => {
    var req = {
      body: {
        name: 'name',
        description: 'desc'
      },
      user: {
        _id: 'ididididididid',
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
          asserts.name = data.name;
          asserts.description = data.description;
          asserts.gifterId = data.gifterId;
          asserts.gifterName = data.gifterName;
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
    assert.strictEqual(asserts.name, req.body.name, 'Name should be set');
    assert.strictEqual(asserts.description, req.body.description,
            'Description should be set');
    assert.strictEqual(asserts.gifterId, req.user._id, 'Should set gifter id');
    assert.strictEqual(asserts.gifterName, req.user.username, 'Should set username');
    assert.strictEqual(asserts.redirect, '/gifts',
            'Redirect should send to gift list');
  })
})
