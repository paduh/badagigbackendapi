'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _badagig = require('./badagig');

var _badagig2 = _interopRequireDefault(_badagig);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var orderSchema = new Schema({
  badagigid: { type: ObjectId, ref: 'BadaGig' },
  badagigerid: { type: ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now }
});

module.exports = _mongoose2.default.model('Order', orderSchema);
//# sourceMappingURL=order.js.map