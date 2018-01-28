'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _banneradvert = require('../model/banneradvert');

var _banneradvert2 = _interopRequireDefault(_banneradvert);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  //'/banneraddvert/add' - Add new Banner advert
  api.post('/add', function (req, res) {
    var newBannerAdvert = new _banneradvert2.default();
    newBannerAdvert.banneradverttitle = req.body.banneradverttitle;
    newBannerAdvert.banneradvertdesc = req.body.banneradvertdesc;
    newBannerAdvert.banneradvertimageUrl = reeq.body.banneradvertimageUrl;

    newBannerAddvert.save(function (err) {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      res.status(200).json({ message: 'New banner advert save successfully' });
    });
  });

  //'/BannerAdvert/' - Get all banner advert
  api.get('/', function (req, res) {
    _banneradvert2.default.find({}, function (err, bannerAdverts) {
      if (err) {
        res.status(500).json({ message: 'An erro has occured ' + err.message });
      }
      res.status(200).json({ bannerAdverts: bannerAdverts });
    });
  });

  //'/banneraddvert/update/:id' - Update one banner advert recoord
  api.put('/update/:id', function (req, res) {
    _banneradvert2.default.findById(req.params.id, function (err, bannerAdvert) {
      if (err) {
        res.status(500).json({ message: 'An error has occure ' + err.message });
        return;
      }
      bannerAdvert.banneradverttitle = req.body.banneradverttitle;
      bannerAdvert.banneradvertdesc = req.body.banneradvertdesc;
      bannerAdvert.banneradvertimageUrl = req.body.banneradvertimageUrl;

      bannerAdvert.save(function (err) {
        if (err) {
          res.status(500).json({ message: 'An error has occured ' + err.message });
          return;
        }
        res.status(200).json({ message: 'Banner advert with id - ' + req.params.id + ' has been updated' });
      });
    });
  });

  //'/banneraddvert/delete/:id' - Delete one banner advert
  api.delete('/delete/:id', function (req, res) {
    _banneradvert2.default.findById(req.params.id, function (err, bannerAdvert) {
      if (err) {
        res.status(500).json({ message: 'An error has occured ' + err.message });
        return;
      }
      bannerAdvert.remove(function (err) {
        if (err) {
          res.status(500).json({ message: 'An error has occured ' + err.message });
          return;
        }
        res.status(200).json({ message: 'Banner advert with id - ' + req.params.id + ' has been deleted' });
      });
    });
  });

  return api;
};
//# sourceMappingURL=banneradvert.js.map