import mongoose from 'mongoose';
import User from './user';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new Schema({
  submittedById: { type:ObjectId, ref: 'User' },
  categoryTitle: { type: String, required: true },
  categoryDescription: String, default: "",
  recommended: Boolean, default: false,
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema);
