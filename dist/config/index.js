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
  "port": 3000,
  "mongoUrl": "mongodb://localhost:27017/badagig",
  // "port": process.env.PORT,
  // "mongoUrl": process.env.MONGODB_URI,
  "bodyLimit": "100kb",
  "accessKeyId": "AKIAIG7U3J3EOCCV6SHA",
  "secretAccessKey": "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",
  "region": "eu-west-2",
  "bucket": "badagigimageupload",
  "expires": "200",
  "contentType": "image/jpeg",
  "namepace": "image.badagig.ng",
  "signatureVersion": "v4",
  "acl": "public-read",
  "facebookClientID": "275017356352218",
  "facebookClientSecret": "4fae403b0b0b5171ec8612fb0d890453",
  "googleClientID": "322793033087-gojnhheh0rvdretit197u9rsn8dopfgk.apps.googleusercontent.com",
  "googleClientSecret": "Ymy5gXvX-7RCoBoYJC2B5n0v"
};
//# sourceMappingURL=index.js.map