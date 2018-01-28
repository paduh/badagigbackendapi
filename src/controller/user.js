import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import User from '../model/user';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // '/v1/user/add' - Create
  api.post('/add', authenticate, (req, res) => {
    let newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.phonenumber = req.body.phonenumber;
    newUser.profilepicurlicUrl = req.body.profilepicurl;

    newUser.save(err => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      res.status(200).json(newUser);
    });
  });

  // '/v1/user/' - Read
  api.get('/', authenticate, (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      res.status(200).json(users);
    });
  });

  // '/v1/user/:id' - Read 1
  api.get('/:id', authenticate, (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      res.status(200).json(user);
    });
  });

  // '/v1/user/:id' - Update
  api.put('/:id', authenticate, (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      user.name = req.body.name;
      user.email = req.body.email;
      user.avatarName = req.body.avatarName;
      user.avatarColor = req.body.avatarColor;
      user.save(err => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        res.status(200).json({ message: 'User info updated' });
      });
    });
  });

  // 'v1/user/byEmail/:email'
  api.get('/byEmail/:email', authenticate, (req, res) => {
    User
      .findOne({ 'email': req.params.email })
      .exec((err, userData) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        res.status(200).json(userData);
      });
  });

  //'v1/user/byId/:id'
  api.get('/byId/:id', authenticate, (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.status(500).json({message: `An error has occured ${err. message}`});
        return;
      }
          res.status(200).json(user);
    })
  })

  // '/vq/user/:id' -Delete
  api.delete('/:id', authenticate, (req, res) => {
    User.remove({
      _id: req.params.id
    }, (err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      res.status(200).json({ message: 'User Successfully Removed'});
    });
  });

  // '/v1/user/' - Delete all
  api.delete('/', authenticate, (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      res.status(200).json({ message: 'All Users Removed'});
    });
  });

  return api;
}
