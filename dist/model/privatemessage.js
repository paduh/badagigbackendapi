'use strict';

var _ref;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Schema = _mongoose2.default.Schema;
var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var privateMessageSchema = new Schema((_ref = {
  messageBody: String, default: "",
  timeStamp: { type: Date, default: Date.now },
  senderId: { type: ObjectId, ref: 'User' },
  recepientId: { type: ObjectId, ref: 'User' },
  userName: String }, _defineProperty(_ref, 'default', ""), _defineProperty(_ref, 'profilePicUrl', String), _defineProperty(_ref, 'default', ""), _ref));

module.exports = _mongoose2.default.model('PrivateMessage', privateMessageSchema);
//# sourceMappingURL=privatemessage.js.map