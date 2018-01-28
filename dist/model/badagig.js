'use strict';

var _ref;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _subcategory = require('./subcategory');

var _subcategory2 = _interopRequireDefault(_subcategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Schema = _mongoose2.default.Schema;
var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var badaGigSchema = new Schema((_ref = {
  gigtitle: String, default: "",
  gigdescription: String }, _defineProperty(_ref, 'default', ""), _defineProperty(_ref, 'searchtags', String), _defineProperty(_ref, 'default', ""), _defineProperty(_ref, 'subcategoryid', { type: ObjectId, ref: 'Subcategory' }), _defineProperty(_ref, 'badagigerid', { type: ObjectId, ref: 'User' }), _defineProperty(_ref, 'deliveryduration', String), _defineProperty(_ref, 'default', ""), _ref));

module.exports = _mongoose2.default.model('BadaGig', badaGigSchema);
//# sourceMappingURL=badagig.js.map