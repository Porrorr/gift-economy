'use strict';
var assert = require('assert');
var rewire = require('rewire');
var ObjectId = require('mongodb').ObjectId;

var controller;
var store;
var asserts;

describe('Gifts controller', () => {

  beforeEach( () => {
    asserts = {};
    controller = rewire('../../controllers/gifts');
    store = { gifts: {} };
    controller.__set__('store', store);
  });

  it('renders a homepage with mongo data', done => {
    var giftData = {};
    store.gifts.find = () => {
      return {
        toArray: callback => {
          callback({}, giftData)
        }
      }
    };

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
        done();
      }
    };
    store.gifts.insertOne = (data, callback) => {
      asserts.data = data;
      callback();
    };

    controller.addNew(req, res);

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
