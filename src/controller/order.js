import mongoose from 'mongoose';
import { Router } from 'express';
import Request from '../model/request';
import BadaGig from '../model/badagig';
import User from '../model/account';
import Order from '../model/order';
import bodyParser  from 'body-parser';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // /v1/order/add - Create
  api.post('/add/byBadaGiger/:badagigerid/byBadaGig/:badagigid', authenticate, (req, res) => {
      User.findById(req.params.badagigerid, (err, user) => {
        if (err) {
            res.status(500).json({message: `An error has occured ${err.message}`});
            return;
        } else if (!user){
          res.status(404).json({message: `An error has occured. User not found:  ${err.message}`});
          return;
        }
      Request.findById(req.params.badagigid, (err, request) => {
          if (err) {
              res.status(500).json({message: `An error has occured ${err.message}`});
              return;
          } else if (!request){
            res.status(404).json({message: `An error has occured. Request not found:  ${err.message}`});
            return;
          }
          console.log(`Request ${request}`);
      let newOrder = new Order();
      newOrder.badagigid = request._id;
      newOrder.badagigerid = user._id;

      newOrder.save(err => {
        if(err){
          res.status(500).json({ message: err });
          return;
        }
        res.status(200).json({ message: 'Order saved successfully'})
      });

      // request.fulfilled = "true";
      // request.save(err => {
      //   if(err){
      //     res.status(500).json({ message: err });
      //        return;
      //   }
      //   res.status(200).json({ message: 'Request updated successfully'})
      //   });
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
