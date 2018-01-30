'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uuidv4 = require('uuid/v4');

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;


  var api = (0, _express.Router)();

  var s3 = new _awsSdk2.default.S3();
  s3.config.update({
    accessKeyId: process.env.ACCESSKEY_ID,
    secretAccessKey: process.env.S3SECRETACCESS_KEY,
    region: config.region,
    signatureVersion: config.signatureVersion
  });

  // /v1/getsignedurl/
  api.get('/', function (req, res, next) {
    console.log('Getting url');
    var params = {
      'Bucket': config.bucket,
      'Key': uuidv4(),
      'Expires': 200,
      'ACL': config.acl,
      Metadata: {
        'Content-Type': config.contentType
      }
    };
    s3.getSignedUrl('putObject', params, function (err, signedUrl) {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      console.log(signedUrl);
      res.status(200).json({
        postUrl: signedUrl,
        getUrl: signedUrl.split("?")[0] });
    });
  });
  return api;
};
//# sourceMappingURL=getsignedurl.js.map