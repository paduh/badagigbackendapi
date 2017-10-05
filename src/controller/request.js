import mongoose from 'mongoose';
import { Router } from 'express';
import Request from '../model/request';
import bodyParser  from 'body-parser';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // /v1/request/add - Create
  api.post('/add', authenticate, (req, res)=> {
    let newRequest = new Reqeust;

    newRequest.productId = req.params.productId;
    newRequest.userId = req.params.productId;
    newRequest.fulfilledById = req.params.fulfilledById;
    newRequest.deliveryDays = req.params.deliveryDays;
    newRequest.description = req.params.description;
    newRequest.budget = req.params.budget;

    newRequest.save(err => {
      if (err) {
        res.status(500).json({message: err});
      }
        res.status(200).json({message: 'New request submitted successfully'});
    });
  });

  // /v1/request/:id Update
  api.put('/:id', authenticate, (req, res)=> {
    Request.findById(req.params.id, (err, request) => {
      if (err) {
        res.status(500).json({message: err});
      }
        request.productId = req.params.productId;
        request.userId = req.params.userId;
        request.fulfilledById = req.params.fulfilledById;
        request.deliveryDays = req.params.deliveryDays;
        Reqeust.description = req.params.description;
        request.budget = req.params.budget;

        request.save(err  =>{
          if (err) {
            res.status(500).json({message: 'Request updated successfully'});
          }
        });
    });
  });

  // /v1/request/byuser/:userId Read
  api.get('/byuser/:userId', authenticate, (req, res) => {
    Request.find({'userId': req.params.id}, (err, request) => {
      if (err) {
        res.status(500).json({message: err});
      }
        res.status(200).json(request);
    });
  });

  // /v1/request/:id Delete 1
  api.delete('/:id', authenticate, (req, res) => {
    Request.remove({_id: req.params.id}, (err, request) => {
      if (err) {
        res.status(500).json({message: err});
      }
        res.status(200).json({message: 'Request deleted successfully'});
    });
  });
  return api;
}
