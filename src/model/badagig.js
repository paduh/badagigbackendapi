import mongoose from 'mongoose';
import User from './user';
import Subcategory from './subcategory';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const badaGigSchema = new Schema({
  gigTtile: String, default: "",
  searchTags: String, default: "",
  subCategoryId: {type: ObjectId, ref: 'Subcategory'},
  badaGigerId: {type: ObjectId, ref: 'User'}
});

module.exports = mongoose.model('BadaGig', badaGigSchema);
