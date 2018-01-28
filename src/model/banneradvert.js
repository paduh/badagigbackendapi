import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const bannerSchema = new Schema({
  banneradverttitle: {type: String, required: true},
  banneradvertimageUrl: {type: String, required: true},
  banneradvertdesc: {type: String, required: false, default: ""}
}, { timestamps

});

module.exports = mongoose.model('Banner', bannerSchema);
