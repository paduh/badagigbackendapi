import mongoose from 'mongoose';
import { Router } from 'express';
import BadaGig from '../model/badagig';
import bodyParser from 'body-parser';

export default({ config, db }) => {
  let api = Router();

  //v1/badagig/add Create
  api.post('/add', (req, res) => {
    let newBadaGig = new BadaGig;
    newBadaGig.gigTtile = req.params.gigTtile;
    newBadaGig.searchTags = req.params.searchTags;
    newBadaGig.subCategoryId = req.params.subCategoryId;

    newBadaGig.save(err => {
      if (err) {
        res.status(500).json({message: err});
      }
        res.status(200).json({message: 'BadaGig saved successfully'});
    });
  });

  // /v1/badagig/byUser/:badagigerId Read
  api.get('/byUser/:badaGigerId', (req, res) => {
    BadaGig.find({badaGigerId: req.params.id}, (err, badagig) => {
      if (err) {
        res.status(500).json({message: err});
      }
        res.status(200).json(badaGig);
    });
  });

  // /v1/badagig/:id Update
  api.put('/:id', (req, res) => {
    BadaGig.findById(req.params.id, (err, badaGig) => {
      if (err) {
        res.status(500).json({message: err});
      }
        badaGig.gigTtile = req.params.gigTtile;
        badaGig.searchTags = req.params.searchTags;
        badaGig.subCategory = req.params.subCategory;
        badaGig.badaGigerId = req.params.badaGigerId;

        badaGig.save(err => {
          if (err) {
            res.status(500).json({message: err});
          }
          res.status(200).json({message: 'BadaGig updated successfully'});
      });
    });
  });

  // /v1/badagig/:id Delete
  api.delete('/:id', (req, res) => {
    BadaGig.remove({_id: req.params.id}, (err, badaGig) => {
      if (err) {
        res.status(500).json({message: err});
      }
        res.status(200).json({message: 'BadaGig deleted successfully'})
    })
  })

  return api;
}
