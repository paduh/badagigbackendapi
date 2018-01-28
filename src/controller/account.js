import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import Account from '../model/account';
import UserDataExt from './extensions/userData-ext';
import async from 'async';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

const TOKENTIME = 60*60*24*90;
const SECRET = "BadaGig SERVER SIDE";

var  nodeMailer = require('nodemailer');

export default ({ config, db }) => {
  let api = Router();

  // '/v1/account/register'
  api.post('/register', (req, res) => {
    UserDataExt.findUserByEmail(req.body.email, (err, userData) => {
      if (err) {
        res.status(409).json({ message: `An error occured: ${err.message}`});
        return;
      } else if (userData) {
        res.status(300).json({ message: `Email ${req.body.email} is already registered`});
      }
      // else {
        Account.register(new Account({username: req.body.email}), req.body.password, function(err, account) {
          if(err) {
            res.status(500).json({ message: err });
            return;
          }
          console.log("Registering new account");
          passport.authenticate('local', { session: false })(req, res, () => {
              res.status(200).send('Successfully created new account');
          });
        });
      // }
    });
  });

  // '/v1/account/login'
  api.post('/login', (req, res, next) => {
		UserDataExt.findUserByEmail(req.body.email, (err, userData) => {
      if (err) {
        res.status(409).json({ message: `An error occured: ${err.message}`});
        return;
      } else {
				next();
			}
    });
	}, passport.authenticate('local', { session: false, scope: [] }), (err, req, res, next) => {
		if (err) {
			res.status(401).json({ message: `Password is incorrect`});
      return;
		}
	}, generateAccessToken, respond);

  // '/v1/account/facebook/token'
  api.post('/auth/facebook/token', passport.authenticate('facebook-token', {session: false}), (req, res, next) => {
      if (req.user) {
        console.log(`User req ${req.user}`);


        req.token = req.token || {};
        req.token = jwt.sign ({
        }, SECRET, {
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
  api.post('/google/token', passport.authenticate('google', {scope: ['profile']}), (req, res) => {
    if (req.user) {
      console.log('Google token route');
      generateAccessToken, respond;
    }
  })

  // '/v1/account/logout'
  api.get('/logout', authenticate, (req, res) => {
    res.logout();
    res.status(200).send('Successfully logged out');
  });

  api.get('/me', authenticate, (req, res) => {
    res.status(200).json(req.user);
  });

  ///v1/account/forgot Generate token, token expiration and send email to user for instruction
  api.post('/forgot', (req, res, next) => {
    console.log('Trying to post');
    async.waterfall([
      (done) => {
        crypto.randomBytes(4, (err, buf) => {
          if (err) {
            res.status(500).json({message: `An error occured: ${err.message}`});
            return;
          }
            var token = buf.toString('hex');
            done(err, token);
        });
      },
        (token, done) => {
          UserDataExt.findUserByEmail(req.body.email, (err, user) => {
            console.log('Searching for user');
            if (err) {
              res.status(500).json({message: `An error occured: ${err.message}`});
              return;
            } else if (!user) {
              res.status(404).json({message: `No user account found`});
              return;
            }
            console.log('Assign token to user profile in mongodb');
              user.tokenExpiration = Date.now() + 3600000 ;// one hour
              user.passwordResetToken = token;
            console.log('Saving token db');
              user.save(err => {
                if (err) {
                  res.status(500).json({message: err});
                  return;
                }
                done(err, user, token);
              });
          });
        },

      (err, user, token) => {
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
          text: 'Hello!' + '\n' +
            'You recently requested to reset your password for the BadaGig platform.' + '\n' +
            'Here is your reset code below.' + '\n\n' +
                      token + '\n\n' +
            'Copy the code above and use it to reset your password.' + '\n\n' +
            'This code will only be valid for the next hour.' + '\n' +
            'If you did not request a password reset then please ignore this email.' + '\n' +
            'Thanks,' + '\n' +
            'Team BadaGig'
        };
          smptTransport.sendMail(mailOptions, (err) => {
            console.log('Now sending mail');
            if (err) {
              console.log('Sendingmail failed');
              res.status(500).json({message: `An error occured: ${err.message}`})
              return;
            }
              //res.status(200).json({message: 'Password reset process has been iniated, please check your email'})
              console.log('mail sent');
              smptTransport.close();
          });
        }
    ])
  });

  // /v1/account/reset/:token
  api.get('/reset/:token', (req, res) => {
    User.findOne({passwordResetToken: req.params.token, tokenExpiration: {$gt: Date.now()}}, (err, user) =>{
      if (err) {
        res.status(500).json({message: `An error occured: ${err.message}`});
        return;
      } else if (!user) {
        res.status(404).json({message: 'Password reset token is invalid or has expired.' });
        return;
      }
        res.status(200).json({message: 'Token found and valid'});
    });
  });

  api.post('/reset/:token', (req, res) => {
    async.waterfall([
      (done) => {
        User.findOne({passwordResetToken: req.params.token, tokenExpiration: {$gt: Date.now()}}, (err, user) =>{
          if (err) {
            res.status(500).json({message: `An error occured: ${err.message}`});
            return;
          } else if (!user) {
            res.status(404).json({message: 'Password reset token is invalid or has expired.' });
            return;
          }
          user.setPassword(req.body.password, (err) => {
            user.passwordResetToken = undefined;
            user.tokenExpiration = undefined;

            user.save(err => {
              if (err) {
                res.status(500).json({error: 'Password reset failed, please try again'});
                return;
              }
              res.status(200).json({success: 'Password has been reset successfully'});
            });
          });
      });
    },
    (user, done) => {
      var smptTransport = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'perfect.aduh@gmail.com',
          pass: 'mmmmmmm'
        }
      });
      var mailOptions = {
        to: user.email,
        from: `noreply@badagig.ng`,
        subject: `BadaGig Platform Password Reset Request`,
        text: `Hello!` + '\n' +
          'This is a confirmation that the password for your account user.email has been successfully updated' + '\n' +
          'Thanks,' + '\n' +
          'Team BadaGig'
      };
        smptTransport.sendMail(mailOptions, (err) => {
          if (err) {
            res.status(500).json({error: `An error occured: ${err.message}`})
            return;
          }
            res.status(200).json({message: 'Password confirmation mail has been sent successfully'});
          console.log('mail sent');
        });
      }
    ])
  });
  return api;
}
