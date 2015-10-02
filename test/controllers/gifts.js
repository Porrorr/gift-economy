var assert = require('assert')
  , rewire = require('rewire')
;

var controller,
  mongoClient;

describe('Gifts controller', function() {

  beforeEach(function() {
    controller = rewire('../../controllers/gifts');
    mongoClient = {};
    controller.__set__('mongoClient', mongoClient);
  });

  it('renders a homepage with mongo data', function(done) {
    giftData = {};
    var db = {
      collection: function(name) {
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
      close: function() {}
    };
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
})
