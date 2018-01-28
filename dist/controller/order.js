'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _request = require('../model/request');

var _request2 = _interopRequireDefault(_request);

var _badagig = require('../model/badagig');

var _badagig2 = _interopRequireDefault(_badagig);

var _account = require('../model/account');

var _account2 = _interopRequireDefault(_account);

var _order = require('../model/order');

var _order2 = _interopRequireDefault(_order);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // /v1/order/add - Create
  api.post('/add/byBadaGiger/:badagigerid/byBadaGig/:badagigid', _authMiddleware.authenticate, function (req, res) {
    _account2.default.findById(req.params.badagigerid, function (err, user) {
      if (err) {
        res.status(500).json({ message: 'An error has occured ' + err.message });
        return;
      } else if (!user) {
        res.status(404).json({ message: 'An error has occured. User not found:  ' + err.message });
        return;
      }
      _request2.default.findById(req.params.badagigid, function (err, request) {
        if (err) {
          res.status(500).json({ message: 'An error has occured ' + err.message });
          return;
        } else if (!request) {
          res.status(404).json({ message: 'An error has occured. Request not found:  ' + err.message });
          return;
        }
        console.log('Request ' + request);
        var newOrder = new _order2.default();
        newOrder.badagigid = request._id;
        newOrder.badagigerid = user._id;

        newOrder.save(function (err) {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }
          res.status(200).json({ message: 'Order saved successfully' });
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
//# sourceMappingURL=order.js.map