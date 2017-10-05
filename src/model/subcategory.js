import mongoose from 'mongoose';
import Category from './category';
import User from './user';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const subCategorySchema = new Schema({
  categoryId: {type: ObjectId, ref: 'Category'},
  userId: { type: ObjectId, ref: 'User'},
  subCategoryTitle: String, default: "",
});

module.exports = mongoose.model('SubCategory', subCategorySchema);
