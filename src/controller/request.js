import mongoose from 'mongoose';
import { Router } from 'express';
import Request from '../model/request';
import SubCategory from '../model/subcategory';
import User from '../model/user';
import bodyParser  from 'body-parser';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // /v1/request/add - Create
  api.post('/add/bySubCategoryId/:id/byBadaGiger/:badaGigerId', authenticate, (req, res)=> {

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
          let newRequest = new Request();
          newRequest.subcategoryid = subCategory._id;
          newRequest.badagigerid = user._id;
          newRequest.deliverydays = req.body.deliverydays;
          newRequest.description = req.body.description;
          newRequest.budget = req.body.budget;
          // newRequest.badaGigeeId = req.body.badaGigeeId;
          // newRequest.platform = req.body.platform;
          // newRequest.serviceType = req.body.serviceType;
          // newRequest.body.expertise = req.body.expertise;

          newRequest.save(err => {
            if (err) {
              res.status(500).json({message: `An error has occured ${err. message}`});
              return;
            }
              res.status(200).json({message: 'New request submitted successfully'});
            });
          });
        });
      });

  // /v1/request/:id Update
  api.put('/:id', authenticate, (req, res)=> {
    Request.findById(req.params.id, (err, request) => {
      if (err) {
        res.status(500).json({message: `An error has occured ${err.message}`});
        return;
      }
      newRequest.subCategoryId = req.body.subCategoryId;
      newRequest.requestedById = req.body.requestedById;
      newRequest.fulfilledById = req.body.fulfilledById;
      newRequest.deliveryDays = req.body.deliveryDays;
      newRequest.requestDate = req.body.requestDate;
      newRequest.description = req.body.description;
      newRequest.budget = req.body.budget;
      // newRequest.platform = req.body.platform;
      // newRequest.serviceType = req.body.serviceType;
      // newRequest.body.expertise = req.body.expertise;

        request.save(err  =>{
          if (err) {
            res.status(500).json({message: `An error has occured ${err.message}`});
            return;
          }
            res.status(200).json({message: 'Request updated successfully'});
        });
    });
  });

  // /v1/request/byuser/:userId Read
  api.get('/byUser/:userId', authenticate, (req, res) => {
    Request.find({'userId': req.params.id}, (err, request) => {
      if (err) {
        res.status(500).json({message: `An error has occured ${err.message}`});
        return;
      }
        res.status(200).json(request);
    });
  });

  // /v1/request/;id Read one request
  api.get('/:id', authenticate, (req, res) => {
    Request.findById(req.params.id, (err, request) => {
      if (err) {
        res.status(500).json({message: `An error has occured ${err. message}`});
        return;
      }
        res.status(200).json(request);
    });
  });

  // /v1/request/all Read All request by All users
  api.get('/', authenticate, (req, res) => {
    Request.find({}, (err, request) => {
      if (err) {
        res.status(500).json({message: `An error has occured ${err.message}`});
        return;
      }
        res.status(200).json(request);
    });
  });


  // /v1/request/:id Delete 1
  api.delete('/:id', authenticate, (req, res) => {
    Request.findById(req.params.id, (err, request) => {
      if (err) {
        res.status(404).json({message: `An error has occured ${err.message}`});
        return;
      }
      Request.remove({_id: req.params.id}, (err, request) => {
        if (err) {
          res.status(500).json({message: `An error has occured: ${err.message}`});
          return;
        }
          res.status(200).json({message: 'Request deleted successfully'});
      });
    });
  });

  return api;
}
