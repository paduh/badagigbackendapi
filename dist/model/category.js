'use strict';

var _ref;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Schema = _mongoose2.default.Schema;
var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var categorySchema = new Schema((_ref = {
  submittedById: { type: ObjectId, ref: 'User' },
  categoryTitle: { type: String, required: true },
  categoryDescription: String, default: "",
  recommended: Boolean }, _defineProperty(_ref, 'default', false), _defineProperty(_ref, 'imageUrl', { type: String, required: true }), _ref));

module.exports = _mongoose2.default.model('Category', categorySchema);
//# sourceMappingURL=category.js.map