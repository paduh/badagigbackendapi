import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String, default: "",
  lastName: String, default: "",
  userName: String, default: "",
  email: String, default: "",
  phoneNumber: Number, default: "",
  profilePicUrl: String, default: "",
  availabity: String, default: "",
  skills: String, default: "",
  education: String, default: "",
  certification: String,
});

module.exports = mongoose.model('User', userSchema);
