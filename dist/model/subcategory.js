'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _category = require('./category');

var _category2 = _interopRequireDefault(_category);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var subCategorySchema = new Schema({
  categoryId: { type: ObjectId, ref: 'Category' },
  submittedById: { type: ObjectId, ref: 'User' },
  subCategoryTitle: String, default: ""
});

module.exports = _mongoose2.default.model('SubCategory', subCategorySchema);
//# sourceMappingURL=subcategory.js.map