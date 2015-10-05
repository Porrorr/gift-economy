var rewire = require('rewire')
  , assert = require('assert')
;

var routes,
  controller
;

describe('Gifts routes', () => {

  beforeEach( () => {
    routes = rewire('../../routes/gifts');
    controller = {};
    routes.__set__('controller', controller);
  });

  var testPassThrough = (routerFunc, controllerFunc, done) => {
    var req = {}, res = {};
    controller[controllerFunc] = function(passedReq, passedRes) {
      assert.equal(passedReq, req, 'Should pass request through');
      assert.equal(passedRes, res, 'Should pass response through');
      done();
    };
    routes.__get__(routerFunc)(req, res);
  }

  it('calls gifts controller', done => {
    testPassThrough('get', 'getHome', done);
  })

  it('calls gifts controller new when hitting /new', done => {
    testPassThrough('getNew', 'getNew', done);
  })

  it('passes through post to controller', done => {
    testPassThrough('post', 'addNew', done);
  })
})
