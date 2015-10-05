var assert = require('assert')
  , rewire = require('rewire')
;

var controller
  , mongoClient
  , db
;

describe('Gifts controller', () => {

  beforeEach( () => {
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
    // To be checked
    var collection, name, description, redirect;

    var req = {
      body: {
        name: 'name',
        description: 'desc'
      }
    };
    var res = {
      redirect: url => {
        redirect = url;
      }
    };
    db.collection = name => {
      assert.equal(name, 'gifts');
      return {
        insertOne: (data, callback) => {
          assert.equal(data.name, req.body.name, 'Name should be set');
          assert.equal(data.description, req.body.description, 'Description should be set');
          callback();
        }
      };
    };
    db.close = () => {
      done();
    }
    mongoClient.connect = (url, callback) => {callback({}, db)};
    controller.addNew(req, res);

    assert.equal(redirect, '/gifts', 'Redirect should send to gift list');
  })
})
