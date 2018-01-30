import mongodb from 'mongodb';
import uuid from 'uuid';

export default {
  //"port": 3060,
  //"mongoUrl": "mongodb://localhost:27017/badagig",
  "port": process.env.PORT,
  "mongoUrl": process.env.MONGODB_URI,
  "bodyLimit": "100kb",
  //"accessKeyId": "AKIAIG7U3J3EOCCV6SHA",
  "accessKeyId": process.env.accessKeyId,
  //"secretAccessKey": "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",
  "secretAccessKey": process.env.secretAccessKey,
  "region": "eu-west-2",
  "bucket": "badagigimageupload",
  "expires": "200",
  "contentType": "image/jpeg",
  "namepace": "image.badagig.ng",
  "signatureVersion": "v4",
  "acl": "public-read",
  //"facebookClientID": "275017356352218",
  "facebookClientID": process.env.facebookClientID,
  //  "facebookClientSecret": "4fae403b0b0b5171ec8612fb0d890453",
  "facebookClientSecret": process.env.facebookClientSecret,
  //"googleClientID": "322793033087-gojnhheh0rvdretit197u9rsn8dopfgk.apps.googleusercontent.com",
  "googleClientID": process.env.googleClientID,
  //"googleClientSecret": "Ymy5gXvX-7RCoBoYJC2B5n0v"
  "googleClientSecret": process.env.googleClientSecret
}
