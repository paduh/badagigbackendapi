import mongoose from 'mongoose';
import User from './user';
import Subcategory from './subcategory';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const requestSchema = new Schema({
  subcategoryId: {type: ObjectId, ref: 'Subcategory'},
  userId: {type: ObjectId, ref: 'User'},
  fulfilledById: {type: ObjectId, ref: 'User', default: ""},
  requestDate: {type: Date, default: Date.now},
  deliveryDays: String,
  description: String, default: "",
  budget: Number, default: 0,
  platform: String, default: "",
  serviceType: String, default: "",
  expertise: String, default: ""
});

module.exports = mongoose.model('Request', requestSchema);
