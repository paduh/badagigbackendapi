'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

var _account = require('../controller/account');

var _account2 = _interopRequireDefault(_account);

var _channel = require('../controller/channel');

var _channel2 = _interopRequireDefault(_channel);

var _privatemessage = require('../controller/privatemessage');

var _privatemessage2 = _interopRequireDefault(_privatemessage);

var _channelmessage = require('../controller/channelmessage');

var _channelmessage2 = _interopRequireDefault(_channelmessage);

var _subcategory = require('../controller/subcategory');

var _subcategory2 = _interopRequireDefault(_subcategory);

var _request = require('../controller/request');

var _request2 = _interopRequireDefault(_request);

var _category = require('../controller/category');

var _category2 = _interopRequireDefault(_category);

var _badagig = require('../controller/badagig');

var _badagig2 = _interopRequireDefault(_badagig);

var _getsignedurl = require('../controller/getsignedurl');

var _getsignedurl2 = _interopRequireDefault(_getsignedurl);

var _order = require('../controller/order');

var _order2 = _interopRequireDefault(_order);

var _banneradvert = require('../controller/banneradvert');

var _banneradvert2 = _interopRequireDefault(_banneradvert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

//connect to db
(0, _db2.default)(function (db) {

  //internal middleware
  router.use((0, _middleware2.default)({ config: _config2.default, db: db }));

  //api routes v1 (/v1)
  router.use('/user', (0, _user2.default)({ config: _config2.default, db: db }));
  router.use('/account', (0, _account2.default)({ config: _config2.default, db: db }));
  router.use('/channel', (0, _channel2.default)({ config: _config2.default, db: db }));
  router.use('/privateMessage', (0, _privatemessage2.default)({ config: _config2.default, db: db }));
  router.use('/channelmessage', (0, _channelmessage2.default)({ config: _config2.default, db: db }));
  router.use('/subcategory', (0, _subcategory2.default)({ config: _config2.default, db: db }));
  router.use('/request', (0, _request2.default)({ config: _config2.default, db: db }));
  router.use('/category', (0, _category2.default)({ config: _config2.default, db: db }));
  router.use('/badagig', (0, _badagig2.default)({ config: _config2.default, db: db }));
  router.use('/getsignedurl', (0, _getsignedurl2.default)({ config: _config2.default, db: db }));
  router.use('/order', (0, _order2.default)({ config: _config2.default, db: db }));
  router.use('/banneradvert', (0, _banneradvert2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map