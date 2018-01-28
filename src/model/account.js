import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

const Account = new Schema({
  email: String,
  password: String,
  facebookid: String,
  googleid: String
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);
