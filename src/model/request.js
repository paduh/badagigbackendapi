import mongoose from 'mongoose';
import User from './user';
import Subcategory from './subcategory';
import Expertise from './expertise';
import Platform from './platform';
import ServiceType from './serviceType';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const requestSchema = new Schema({
  subcategoryid: {type: ObjectId, ref: 'Subcategory'},
  badagigeeid: {type: ObjectId, ref: 'User'},
  badagigerid: {type: ObjectId, ref: 'User',},
  requestdate: {type: Date, default: Date.now},
  deliverydays: String, default: "",
  description: String, default: "",
  budget: Number, default: 0,
  fulfilled: Boolean, default: false
  // platform: {type: ObjectId, ref: Platform},
  // servicetype: {type: ObjectId, ref: ServiceType},
  // expertise: {type: ObjectId, ref: Expertise}
});

module.exports = mongoose.model('Request', requestSchema);
