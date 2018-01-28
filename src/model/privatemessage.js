import mongoose from 'mongoose';
import User from './user';
import Channel from './channel';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const privateMessageSchema = new Schema({
  messageBody: String, default: "",
  timeStamp: {type: Date, default: Date.now},
  senderId: {type: ObjectId, ref: 'User'},
  recepientId: {type: ObjectId, ref: 'User'},
  userName: String, default: "",
  profilePicUrl: String, default: "",
});

module.exports = mongoose.model('PrivateMessage', privateMessageSchema);
