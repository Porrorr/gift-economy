var assert = require('assert')
  , rewire = require('rewire')
;

var controller
  , mongoClient
  , db
;

describe('Gifts controller', function() {

  beforeEach(function() {
    controller = rewire('../../controllers/gifts');
    mongoClient = {};
    db = {};
    controller.__set__('mongoClient', mongoClient);
  });

  it('renders a homepage with mongo data', function(done) {
    giftData = {};
    db.collection = function(name) {
        assert.equal(name, 'gifts');
        return {
          find: function() {
            return {
              toArray: function(callback) {
                callback({}, giftData)
              }
            }
          }
        };
      },
    db.close = function() {}
    mongoClient.connect = function(url, callback) {callback({}, db)};
    controller.getHome({}, {
      render: function(template, data) {
        assert.strictEqual(template, 'gifts', 'Template name');
        assert.equal(data.title, 'Gifts', 'Template must have title set correctly');
        assert.equal(data.gift, giftData, 'Must pass mongo data to the template');
        done();
      }
    });
  })

  it('renders the new gift form in getNew', function(done) {
    var res = {
      render: function(template, data) {
        assert.strictEqual(template, 'new', 'Template name must be correct');
        assert.equal(data.title, 'New gift creator', 'Must set page title');
        done();
      }
    };
    controller.getNew({}, res);
  })

  it('creates new gift in addNew', function(done) {
    // To be checked
    var collection, name, description, redirect;

    var req = {
      body: {
        name: 'name',
        description: 'desc'
      }
    };
    var res = {
      redirect: function(url) {
        redirect = url;
      }
    };
    db.collection = function(name) {
      assert.equal(name, 'gifts');
      return {
        insertOne: function(data, callback) {
          assert.equal(data.name, req.body.name, 'Name should be set');
          assert.equal(data.description, req.body.description, 'Description should be set');
          callback();
        }
      };
    };
    db.close = function() {
      done();
    }
    mongoClient.connect = function(url, callback) {callback({}, db)};
    controller.addNew(req, res);

    assert.equal(redirect, '/gifts', 'Redirect should send to gift list');
  })
})
