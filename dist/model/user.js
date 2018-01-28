"use strict";

var _ref;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Schema = _mongoose2.default.Schema;

var userSchema = new Schema((_ref = {
  firstname: String, default: "",
  lastname: String }, _defineProperty(_ref, "default", ""), _defineProperty(_ref, "username", String), _defineProperty(_ref, "default", ""), _defineProperty(_ref, "email", String), _defineProperty(_ref, "default", ""), _defineProperty(_ref, "facebookid", String), _defineProperty(_ref, "default", ""), _defineProperty(_ref, "googleid", String), _defineProperty(_ref, "default", ""), _defineProperty(_ref, "phonenumber", Number), _defineProperty(_ref, "default", ""), _defineProperty(_ref, "profilepicurl", String), _defineProperty(_ref, "default", ""), _defineProperty(_ref, "availabity", String), _defineProperty(_ref, "default", ""), _defineProperty(_ref, "skills", String), _defineProperty(_ref, "default", ""), _defineProperty(_ref, "education", String), _defineProperty(_ref, "default", ""), _defineProperty(_ref, "certification", String), _defineProperty(_ref, "default", ""), _defineProperty(_ref, "passwordresetToken", String), _defineProperty(_ref, "tokenexpiration", String), _ref));

module.exports = _mongoose2.default.model('User', userSchema);
//# sourceMappingURL=user.js.map