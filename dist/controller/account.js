'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _account = require('../model/account');

var _account2 = _interopRequireDefault(_account);

var _userDataExt = require('./extensions/userData-ext');

var _userDataExt2 = _interopRequireDefault(_userDataExt);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOKENTIME = 60 * 60 * 24 * 90;
var SECRET = "BadaGig SERVER SIDE";

var nodeMailer = require('nodemailer');

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/account/register'
  api.post('/register', function (req, res) {
    _userDataExt2.default.findUserByEmail(req.body.email, function (err, userData) {
      if (err) {
        res.status(409).json({ message: 'An error occured: ' + err.message });
        return;
      } else if (userData) {
        res.status(300).json({ message: 'Email ' + req.body.email + ' is already registered' });
      }
      // else {
      _account2.default.register(new _account2.default({ username: req.body.email }), req.body.password, function (err, account) {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        console.log("Registering new account");
        _passport2.default.authenticate('local', { session: false })(req, res, function () {
          res.status(200).send('Successfully created new account');
        });
      });
      // }
    });
  });

  // '/v1/account/login'
  api.post('/login', function (req, res, next) {
    _userDataExt2.default.findUserByEmail(req.body.email, function (err, userData) {
      if (err) {
        res.status(409).json({ message: 'An error occured: ' + err.message });
        return;
      } else {
        next();
      }
    });
  }, _passport2.default.authenticate('local', { session: false, scope: [] }), function (err, req, res, next) {
    if (err) {
      res.status(401).json({ message: 'Password is incorrect' });
      return;
    }
  }, _authMiddleware.generateAccessToken, _authMiddleware.respond);

  // '/v1/account/facebook/token'
  api.post('/auth/facebook/token', _passport2.default.authenticate('facebook-token', { session: false }), function (req, res, next) {
    if (req.user) {
      console.log('User req ' + req.user);
      _authMiddleware.generateAccessToken;
      _authMiddleware.respond;

      req.token = req.token || {};
      req.token = _jsonwebtoken2.default.sign({}, SECRET, {
        expiresIn: TOKENTIME // 90 days
      });

      res.status(200).json({
        user: req.user.email,
        token: req.token,
        id: req.user._id
      });
      //res.status(200).json({message: `New user added from facebook successfully`});
      //var token = authenticate.getToken({_id: req.user._id});
    }
  });

  //'/v1/account/google/token'
  api.post('/google/token', _passport2.default.authenticate('google-token'), function (req, res) {
    if (req.user) {
      console.log('Google token route');
      _authMiddleware.generateAccessToken, _authMiddleware.respond;
    }
  });

  // '/v1/account/logout'
  api.get('/logout', _authMiddleware.authenticate, function (req, res) {
    res.logout();
    res.status(200).send('Successfully logged out');
  });

  api.get('/me', _authMiddleware.authenticate, function (req, res) {
    res.status(200).json(req.user);
  });

  ///v1/account/forgot Generate token, token expiration and send email to user for instruction
  api.post('/forgot', function (req, res, next) {
    console.log('Trying to post');
    _async2.default.waterfall([function (done) {
      _crypto2.default.randomBytes(4, function (err, buf) {
        if (err) {
          res.status(500).json({ message: 'An error occured: ' + err.message });
          return;
        }
        var token = buf.toString('hex');
        done(err, token);
      });
    }, function (token, done) {
      _userDataExt2.default.findUserByEmail(req.body.email, function (err, user) {
        console.log('Searching for user');
        if (err) {
          res.status(500).json({ message: 'An error occured: ' + err.message });
          return;
        } else if (!user) {
          res.status(404).json({ message: 'No user account found' });
          return;
        }
        console.log('Assign token to user profile in mongodb');
        user.tokenExpiration = Date.now() + 3600000; // one hour
        user.passwordResetToken = token;
        console.log('Saving token db');
        user.save(function (err) {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }
          done(err, user, token);
        });
      });
    }, function (err, user, token) {
      console.log('Tyring to login');
      var smptTransport = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
          XOAuth2: {
            user: 'perfect.aduh@gmail.com',
            clienId: '322793033087-q13jmff94tnv4gtqejqjio982kuoctfd.apps.googleusercontent.com',
            clientSecret: 'YaSj9Bk2Og4nZlMlH8Twu_UB',
            refreshToken: '1/iITHN8FnaWEZeMfPVrHxPojZ4AtCG22YLflgBxWm2W0'
          }
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'noreply@badagig.ng',
        subject: 'BadaGig Platform Password Reset Request',
        text: 'Hello!' + '\n' + 'You recently requested to reset your password for the BadaGig platform.' + '\n' + 'Here is your reset code below.' + '\n\n' + token + '\n\n' + 'Copy the code above and use it to reset your password.' + '\n\n' + 'This code will only be valid for the next hour.' + '\n' + 'If you did not request a password reset then please ignore this email.' + '\n' + 'Thanks,' + '\n' + 'Team BadaGig'
      };
      smptTransport.sendMail(mailOptions, function (err) {
        console.log('Now sending mail');
        if (err) {
          console.log('Sendingmail failed');
          res.status(500).json({ message: 'An error occured: ' + err.message });
          return;
        }
        //res.status(200).json({message: 'Password reset process has been iniated, please check your email'})
        console.log('mail sent');
        smptTransport.close();
      });
    }]);
  });

  // /v1/account/reset/:token
  api.get('/reset/:token', function (req, res) {
    User.findOne({ passwordResetToken: req.params.token, tokenExpiration: { $gt: Date.now() } }, function (err, user) {
      if (err) {
        res.status(500).json({ message: 'An error occured: ' + err.message });
        return;
      } else if (!user) {
        res.status(404).json({ message: 'Password reset token is invalid or has expired.' });
        return;
      }
      res.status(200).json({ message: 'Token found and valid' });
    });
  });

  api.post('/reset/:token', function (req, res) {
    _async2.default.waterfall([function (done) {
      User.findOne({ passwordResetToken: req.params.token, tokenExpiration: { $gt: Date.now() } }, function (err, user) {
        if (err) {
          res.status(500).json({ message: 'An error occured: ' + err.message });
          return;
        } else if (!user) {
          res.status(404).json({ message: 'Password reset token is invalid or has expired.' });
          return;
        }
        user.setPassword(req.body.password, function (err) {
          user.passwordResetToken = undefined;
          user.tokenExpiration = undefined;

          user.save(function (err) {
            if (err) {
              res.status(500).json({ error: 'Password reset failed, please try again' });
              return;
            }
            res.status(200).json({ success: 'Password has been reset successfully' });
          });
        });
      });
    }, function (user, done) {
      var smptTransport = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'perfect.aduh@gmail.com',
          pass: 'mmmmmmm'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'noreply@badagig.ng',
        subject: 'BadaGig Platform Password Reset Request',
        text: 'Hello!' + '\n' + 'This is a confirmation that the password for your account user.email has been successfully updated' + '\n' + 'Thanks,' + '\n' + 'Team BadaGig'
      };
      smptTransport.sendMail(mailOptions, function (err) {
        if (err) {
          res.status(500).json({ error: 'An error occured: ' + err.message });
          return;
        }
        res.status(200).json({ message: 'Password confirmation mail has been sent successfully' });
        console.log('mail sent');
      });
    }]);
  });
  return api;
};
//# sourceMappingURL=account.js.map