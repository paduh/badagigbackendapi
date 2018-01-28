'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _request = require('../model/request');

var _request2 = _interopRequireDefault(_request);

var _subcategory = require('../model/subcategory');

var _subcategory2 = _interopRequireDefault(_subcategory);

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // /v1/request/add - Create
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
        var newRequest = new _request2.default();
        newRequest.subcategoryid = subCategory._id;
        newRequest.badagigerid = user._id;
        newRequest.deliverydays = req.body.deliverydays;
        newRequest.description = req.body.description;
        newRequest.budget = req.body.budget;
        // newRequest.badaGigeeId = req.body.badaGigeeId;
        // newRequest.platform = req.body.platform;
        // newRequest.serviceType = req.body.serviceType;
        // newRequest.body.expertise = req.body.expertise;

        newRequest.save(function (err) {
          if (err) {
            res.status(500).json({ message: 'An error has occured ' + err.message });
            return;
          }
          res.status(200).json({ message: 'New request submitted successfully' });
        });
      });
    });
  });

  // /v1/request/:id Update
  api.put('/:id', _authMiddleware.authenticate, function (req, res) {
    _request2.default.findById(req.params.id, function (err, request) {
      if (err) {
        res.status(500).json({ message: 'An error has occured ' + err.message });
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

      request.save(function (err) {
        if (err) {
          res.status(500).json({ message: 'An error has occured ' + err.message });
          return;
        }
        res.status(200).json({ message: 'Request updated successfully' });
      });
    });
  });

  // /v1/request/byuser/:userId Read
  api.get('/byUser/:userId', _authMiddleware.authenticate, function (req, res) {
    _request2.default.find({ 'userId': req.params.id }, function (err, request) {
      if (err) {
        res.status(500).json({ message: 'An error has occured ' + err.message });
        return;
      }
      res.status(200).json(request);
    });
  });

  // /v1/request/;id Read one request
  api.get('/:id', _authMiddleware.authenticate, function (req, res) {
    _request2.default.findById(req.params.id, function (err, request) {
      if (err) {
        res.status(500).json({ message: 'An error has occured ' + err.message });
        return;
      }
      res.status(200).json(request);
    });
  });

  // /v1/request/all Read All request by All users
  api.get('/', _authMiddleware.authenticate, function (req, res) {
    _request2.default.find({}, function (err, request) {
      if (err) {
        res.status(500).json({ message: 'An error has occured ' + err.message });
        return;
      }
      res.status(200).json(request);
    });
  });

  // /v1/request/:id Delete 1
  api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
    _request2.default.findById(req.params.id, function (err, request) {
      if (err) {
        res.status(404).json({ message: 'An error has occured ' + err.message });
        return;
      }
      _request2.default.remove({ _id: req.params.id }, function (err, request) {
        if (err) {
          res.status(500).json({ message: 'An error has occured: ' + err.message });
          return;
        }
        res.status(200).json({ message: 'Request deleted successfully' });
      });
    });
  });

  return api;
};
//# sourceMappingURL=request.js.map