'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _badagig = require('../model/badagig');

var _badagig2 = _interopRequireDefault(_badagig);

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

var _subcategory = require('../model/subcategory');

var _subcategory2 = _interopRequireDefault(_subcategory);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  //v1/badagig/add Create
  api.post('/add/bySubCategoryId/:id/byBadaGiger/:badaGigerId', _authMiddleware.authenticate, function (req, res) {
    _subcategory2.default.findById(req.params.id, function (err, subCategory) {
      if (err) {
        res.status(500).json({ message: 'An error has occured ' + err.message });
        return;
      }
      _user2.default.findById(req.params.badaGigerId, function (err, user) {
        if (err) {
          res.status(500).json({ message: 'An error has occured ' + err.message });
          return;
        }
        var newBadaGig = new _badagig2.default();
        newBadaGig.gigtitle = req.body.gigtitle;
        newBadaGig.gigdescription = req.body.gigdescription;
        newBadaGig.searchtags = req.body.searchtags;
        newBadaGig.subcategoryid = subCategory._id;
        newBadaGig.badagigerid = user._id;
        newBadaGig.deliveryduration = req.body.deliveryduration;

        newBadaGig.save(function (err) {
          if (err) {
            res.status(500).json({ message: 'An error has occured: ' + err.message });
            return;
          }
          res.status(200).json({ message: 'BadaGig saved successfully' });
        });
      });
    });
  });

  // /v1/badagig/  Read All badagig
  api.get('/', _authMiddleware.authenticate, function (req, res) {
    _badagig2.default.find({}, function (err, badaGid) {
      if (err) {
        res.status(500).json({ message: 'An error has occured: ' + err.message });
        return;
      }
      res.status(200).json({ message: badaGig });
    });
  });

  // /v1/badagig/byUser/:badagigerId Read 1
  api.get('/byUser/:badaGigerId', _authMiddleware.authenticate, function (req, res) {
    _badagig2.default.find({ badaGigerId: req.params.id }, function (err, badagig) {
      if (err) {
        res.status(500).json({ message: 'An error has occured: ' + err.message });
        return;
      }
      res.status(200).json(badaGig);
    });
  });

  // /v1/badagig/:id Update
  api.put('/:id', _authMiddleware.authenticate, function (req, res) {
    _badagig2.default.findById(req.params.id, function (err, badaGig) {
      if (err) {
        res.status(500).json({ message: 'An error has occured: ' + err.message });
        return;
      }
      badaGig.gigTitle = req.body.gigTitle;
      badaGig.gigDescription = req.body.gigDescription;
      badaGig.searchTags = req.body.searchTags;
      //  badaGig.subCategory = req.body.subCategory;
      badaGig.badaGigerId = req.body.badaGigerId;
      badaGig.deliveryDuration = req.body.deliveryDuration;

      badaGig.save(function (err) {
        if (err) {
          res.status(500).json({ message: 'An error has occured: ' + err.message });
          return;
        }
        res.status(200).json({ message: 'BadaGig updated successfully' });
      });
    });
  });

  // /v1/badagig/:id Delete
  api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
    _badagig2.default.findById(req.params.id, function (err, badaGig) {
      if (err) {
        res.status(500).json({ message: 'An error has occured ' + err.message });
        return;
      }
      badaGig.remove({ _id: req.params.id }, function (err, badaGig) {
        if (err) {
          res.status(500).json({ message: 'An error has occured: ' + err.message });
          return;
        }
        res.status(200).json({ message: 'BadaGig deleted successfully' });
      });
    });
  });

  return api;
};
//# sourceMappingURL=badagig.js.map