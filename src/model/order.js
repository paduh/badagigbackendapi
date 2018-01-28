import mongoose from 'mongoose';
import BadaGig from './badagig';
import User  from './user';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new Schema({
  badagigid: {type: ObjectId, ref: 'BadaGig'},
  badagigerid: {type: ObjectId, ref: 'User'},
  date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Order', orderSchema);
