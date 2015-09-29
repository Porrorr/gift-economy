var rewire = require('rewire')
  , assert = require('assert')
;

var routes;

describe('Gifts routes', function() {

  beforeEach(function() {
    routes = rewire('../../routes/gifts');
  });

  it('renders an example page', function(done) {
    routes.__get__('get')({}, {
      render: function(template, data) {
        assert.strictEqual(template, 'gifts', 'Template name');
        assert.notEqual(data, undefined, 'Template needs data to be passed to it');
        done();
      }
    });
  })
})
