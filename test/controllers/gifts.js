var assert = require('assert')
;

var controller;

describe('Gifts controller', function() {

  beforeEach(function() {
    controller = require('../../controllers/gifts');
  });

  it('renders an example homepage', function(done) {
    controller.getHome({}, {
      render: function(template, data) {
        assert.strictEqual(template, 'gifts', 'Template name');
        assert.notEqual(data, undefined, 'Template needs data to be passed to it');
        assert.notDeepEqual(data, {}, 'Cannot pass empty data to template');
        done();
      }
    });
  })
})
