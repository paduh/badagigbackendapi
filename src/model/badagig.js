import mongoose from 'mongoose';
import User from './user';
import Subcategory from './subcategory';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const badaGigSchema = new Schema({
  gigtitle: String, default: "",
  gigdescription: String, default: "",
  searchtags: String, default: "",
  subcategoryid: {type: ObjectId, ref: 'Subcategory'},
  badagigerid: {type: ObjectId, ref: 'User'},
  deliveryduration: String, default: ""
});

module.exports = mongoose.model('BadaGig', badaGigSchema);
