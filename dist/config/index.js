'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  //"port": 3060,
  //"mongoUrl": "mongodb://localhost:27017/badagig",
  "port": process.env.PORT,
  "mongoUrl": process.env.MONGODB_URI,
  "bodyLimit": "100kb",
  //"accessKeyId": "AKIAIG7U3J3EOCCV6SHA",
  "accessKeyId": process.env.S3ACCESSKEYID,
  //"secretAccessKey": "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",
  "secretAccessKey": process.env.S3SECRETACCESSKEY,
  "region": "eu-west-2",
  "bucket": "badagigimageupload",
  "expires": "200",
  "contentType": "image/jpeg",
  "namepace": "image.badagig.ng",
  "signatureVersion": "v4",
  "acl": "public-read",
  //"facebookClientID": "275017356352218",
  "facebookClientID": process.env.FACEBOOKCLIENTID,
  //  "facebookClientSecret": "4fae403b0b0b5171ec8612fb0d890453",
  "facebookClientSecret": process.env.FACEBOOKCLIENTSECRET,
  //"googleClientID": "322793033087-gojnhheh0rvdretit197u9rsn8dopfgk.apps.googleusercontent.com",
  "googleClientID": process.env.GOOGLECLIENTID,
  //"googleClientSecret": "Ymy5gXvX-7RCoBoYJC2B5n0v"
  "googleClientSecret": process.env.GOOGLECLIENTSECRET
};
//# sourceMappingURL=index.js.map