import aws from 'aws-sdk';
import bodyParser from 'body-parser';
import { Router } from 'express';
import config from '../config';

import { authenticate } from '../middleware/authMiddleware';

const uuidv4 = require('uuid/v4');

export default({ config, db }) => {

    let api = Router();

    var s3 = new aws.S3();
    s3.config.update({
      accessKeyId: config.S3ACCESSKEYID,
      secretAccessKey: config.S3SECRETACCESSKEY,
      region: config.region,
      signatureVersion: config.signatureVersion,
    });

  // /v1/getsignedurl/
  api.get('/', (req, res, next) => {
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
    s3.getSignedUrl('putObject', params, (err, signedUrl) => {
      if (err) {
        res.status(500).json({message: err});
        return;
      }
      console.log(signedUrl);
        res.status(200).json({
          postUrl: signedUrl,
          getUrl: signedUrl.split("?")[0]})
    });
  });
  return api;
}
