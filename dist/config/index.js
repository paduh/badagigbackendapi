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
};
//# sourceMappingURL=index.js.map