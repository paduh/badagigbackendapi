import mongoose from 'mongoose';
import { Router } from 'express';
import BadaGig from '../model/badagig';
import User from '../model/user';
import SubCategory from '../model/subcategory';
import bodyParser from 'body-parser';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  //v1/badagig/add Create
  api.post('/add/bySubCategoryId/:id/byBadaGiger/:badaGigerId', authenticate, (req, res) => {
    SubCategory.findById(req.params.id, (err, subCategory) => {
      if (err) {
          res.status(500).json({message: `An error has occured ${err. message}`});
          return;
      }
      User.findById(req.params.badaGigerId, (err, user) => {
        if (err) {
            res.status(500).json({message: `An error has occured ${err. message}`});
            return;
        }
        let newBadaGig = new BadaGig();
        newBadaGig.gigtitle = req.body.gigtitle;
        newBadaGig.gigdescription = req.body.gigdescription
        newBadaGig.searchtags = req.body.searchtags;
        newBadaGig.subcategoryid = subCategory._id;
        newBadaGig.badagigerid = user._id;
        newBadaGig.deliveryduration = req.body.deliveryduration;

        newBadaGig.save(err => {
          if (err) {
            res.status(500).json({message: `An error has occured: ${err.message}`});
            return;
          }
            res.status(200).json({message: 'BadaGig saved successfully'});
        });
    });
  });
});

  // /v1/badagig/  Read All badagig
  api.get('/', authenticate, (req, res) => {
    BadaGig.find({}, (err, badaGid) => {
      if (err) {
        res.status(500).json({message: `An error has occured: ${err.message}`});
        return;
      }
        res.status(200).json({message: badaGig});
    });
  });

  // /v1/badagig/byUser/:badagigerId Read 1
  api.get('/byUser/:badaGigerId', authenticate, (req, res) => {
    BadaGig.find({badaGigerId: req.params.id}, (err, badagig) => {
      if (err) {
        res.status(500).json({message: `An error has occured: ${err.message}`});
        return;
      }
        res.status(200).json(badaGig);
    });
  });

  // /v1/badagig/:id Update
  api.put('/:id', authenticate, (req, res) => {
    BadaGig.findById(req.params.id, (err, badaGig) => {
      if (err) {
        res.status(500).json({message: `An error has occured: ${err.message}`});
        return;
      }
        badaGig.gigTitle = req.body.gigTitle;
        badaGig.gigDescription  =req.body.gigDescription;
        badaGig.searchTags = req.body.searchTags;
      //  badaGig.subCategory = req.body.subCategory;
        badaGig.badaGigerId = req.body.badaGigerId;
        badaGig.deliveryDuration = req.body.deliveryDuration;

        badaGig.save(err => {
          if (err) {
            res.status(500).json({message: `An error has occured: ${err.message}`});
            return;
          }
          res.status(200).json({message: 'BadaGig updated successfully'});
      });
    });
  });

  // /v1/badagig/:id Delete
  api.delete('/:id', authenticate, (req, res) => {
    BadaGig.findById(req.params.id, (err, badaGig) => {
      if (err) {
        res.status(500).json({message: `An error has occured ${err.message}`});
        return;
      }
      badaGig.remove({_id: req.params.id}, (err, badaGig) => {
        if (err) {
          res.status(500).json({message: `An error has occured: ${err.message}`});
          return;
        }
          res.status(200).json({message: 'BadaGig deleted successfully'});
    });
    });
  });

  return api;
}
