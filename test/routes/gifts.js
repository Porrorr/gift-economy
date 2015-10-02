var rewire = require('rewire')
  , assert = require('assert')
;

var routes,
  controller
;

describe('Gifts routes', function() {

  beforeEach(function() {
    routes = rewire('../../routes/gifts');
    controller = {};
    routes.__set__('controller', controller);
  });

  it('calls gifts controller', function(done) {
    var req = {}, res = {};
    controller.getHome = function(passedReq, passedRes) {
      assert.equal(passedReq, req, 'Should pass request through');
      assert.equal(passedRes, res, 'Should pass response through');
      done();
    };
    routes.__get__('get')(req, res);
  })

  it('calls gifts controller new when hitting /new', function(done) {
    var req = {}, res = {};
    controller.getNew = function(passedReq, passedRes) {
      assert.equal(passedReq, req, 'Should pass request through');
      assert.equal(passedRes, res, 'Should pass response through');
      done();
    };
    routes.__get__('getNew')(req, res);
  })
})
