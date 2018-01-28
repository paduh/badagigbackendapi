import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME = 60*60*24*90;
const SECRET = "BadaGig SERVER SIDE";

let authenticate = expressJwt({ secret: SECRET });

let generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign ({
  }, SECRET, {
    expiresIn: TOKENTIME // 90 days
  });
  next();
}

let respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token,
    id: req.user._id
  });
}

module.exports = {
  authenticate,
  generateAccessToken,
  respond
}
