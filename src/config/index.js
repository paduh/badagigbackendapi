import mongodb from 'mongodb';
import uuid from 'uuid';

export default {
  //"port": 3060,
  //"mongoUrl": "mongodb://localhost:27017/badagig",
  "port": process.env.PORT,
  "mongoUrl": process.env.MONGODB_URI,
  "bodyLimit": "100kb",

  "accessKeyId": process.env.accessKeyId,

  "secretAccessKey": process.env.secretAccessKey,
  "region": "eu-west-2",
  "bucket": "badagigimageupload",
  "expires": "200",
  "contentType": "image/jpeg",
  "namepace": "image.badagig.ng",
  "signatureVersion": "v4",
  "acl": "public-read",

  "facebookClientID": process.env.facebookClientID,

  "facebookClientSecret": process.env.facebookClientSecret,

  "googleClientID": process.env.googleClientID,

  "googleClientSecret": process.env.googleClientSecret
}
