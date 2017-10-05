import mongoose from 'mongoose';
import User from './user';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new Schema({
  submittedById: {type:ObjectId, ref: 'User'},
  updatedById: {type: ObjectId, ref: 'User', default: ""},
  categoryTitle: String, default: "",
  categoryDescription: String, default: ""
});

module.exports = mongoose.model('Category', categorySchema);
