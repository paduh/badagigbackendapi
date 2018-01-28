import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import BannerAdvert from '../model/banneradvert';

import { authenticate } from '../middleware/authMiddleware';

export default({config, db }) => {
  let api = Router();

//'/banneraddvert/add' - Add new Banner advert
api.post('/add', (req, res) => {
  let newBannerAdvert = new BannerAdvert();
  newBannerAdvert.banneradverttitle = req.body.banneradverttitle;
  newBannerAdvert.banneradvertdesc = req.body.banneradvertdesc;
  newBannerAdvert.banneradvertimageUrl = reeq.body.banneradvertimageUrl;

  newBannerAddvert.save(err => {
    if (err) {
      res.status(500).json({message: err});
      return;
    }
      res.status(200).json({message: 'New banner advert save successfully'});
  });
});

//'/BannerAdvert/' - Get all banner advert
api.get('/', (req, res) => {
  BannerAdvert.find({}, (err, bannerAdverts) => {
    if (err) {
      res.status(500).json({message: `An erro has occured ${err.message}`})
    }
      res.status(200).json({bannerAdverts});
  });
});

//'/banneraddvert/update/:id' - Update one banner advert recoord
api.put('/update/:id', (req, res) => {
  BannerAdvert.findById(req.params.id, (err, bannerAdvert) => {
    if (err) {
      res.status(500).json({message: `An error has occure ${err.message}`});
      return;
    }
      bannerAdvert.banneradverttitle = req.body.banneradverttitle;
      bannerAdvert.banneradvertdesc = req.body.banneradvertdesc;
      bannerAdvert.banneradvertimageUrl = req.body.banneradvertimageUrl;

      bannerAdvert.save(err => {
        if (err) {
          res.status(500).json({message: `An error has occured ${err.message}`});
          return;
        }
        res.status(200).json({message: `Banner advert with id - ${req.params.id} has been updated` });
      });
  });
});

//'/banneraddvert/delete/:id' - Delete one banner advert
api.delete('/delete/:id', (req, res) => {
  BannerAdvert.findById(req.params.id, (err, bannerAdvert) => {
      if (err) {
        res.status(500).json({message: `An error has occured ${err.message}`});
        return;
      }
        bannerAdvert.remove(err => {
          if (err) {
            res.status(500).json({message: `An error has occured ${err.message}`});
            return;
          }
          res.status(200).json({message: `Banner advert with id - ${req.params.id} has been deleted` });
      });
  });
});


  return api;
}
