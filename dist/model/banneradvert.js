'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var bannerSchema = new Schema({
  banneradverttitle: { type: String, required: true },
  banneradvertimageUrl: { type: String, required: true },
  banneradvertdesc: { type: String, required: false, default: "" }
}, { timestamps: _mongooseTimestamp2.default

});

module.exports = _mongoose2.default.model('Banner', bannerSchema);
//# sourceMappingURL=banneradvert.js.map