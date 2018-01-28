'use strict';

var _ref;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _subcategory = require('./subcategory');

var _subcategory2 = _interopRequireDefault(_subcategory);

var _expertise = require('./expertise');

var _expertise2 = _interopRequireDefault(_expertise);

var _platform = require('./platform');

var _platform2 = _interopRequireDefault(_platform);

var _servicetype = require('./servicetype');

var _servicetype2 = _interopRequireDefault(_servicetype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Schema = _mongoose2.default.Schema;
var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var requestSchema = new Schema((_ref = {
  subcategoryid: { type: ObjectId, ref: 'Subcategory' },
  badagigeeid: { type: ObjectId, ref: 'User' },
  badagigerid: { type: ObjectId, ref: 'User' },
  requestdate: { type: Date, default: Date.now },
  deliverydays: String, default: "",
  description: String }, _defineProperty(_ref, 'default', ""), _defineProperty(_ref, 'budget', Number), _defineProperty(_ref, 'default', 0), _defineProperty(_ref, 'fulfilled', Boolean), _defineProperty(_ref, 'default', false), _ref));
module.exports = _mongoose2.default.model('Request', requestSchema);
//# sourceMappingURL=request.js.map