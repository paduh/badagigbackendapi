'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _subcategory = require('../model/subcategory');

var _subcategory2 = _interopRequireDefault(_subcategory);

var _category = require('../model/category');

var _category2 = _interopRequireDefault(_category);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  ///v1/subcategory/add/:categoryId - Create
  api.post('/add/:id', _authMiddleware.authenticate, function (req, res) {
    _category2.default.findById(req.params.id, function (err, category) {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }

      var newSubCategory = new _subcategory2.default();
      newSubCategory.categoryId = category._id;
      newSubCategory.subCategoryTitle = req.body.subCategoryTitle;
      newSubCategory.save(function (err) {
        if (err) {
          res.status(500).json({ message: 'An error has occured ' + err.message });
          return;
        }
        res.status(200).json({ message: 'Subcategory saved successfully' });
      });
    });
  });

  // /v1/subcategory/:id Read 1
  api.get('/', _authMiddleware.authenticate, function (req, res) {
    _subcategory2.default.find({}, function (err, subCategory) {
      if (err) {
        res.status(500).json({ message: 'An error has occured ' + err.message });
        return;
      }
      res.status(200).json(subCategory);
    });
  });

  // v1/subcategory/byCategory/:categoryId
  api.get('/bycategory/:id', function (req, res) {
    _subcategory2.default.find({ categoryId: req.params.id }, function (err, subCategory) {
      if (err) {
        res.status(500).json({ message: 'An error has occured ' + err.message });
        return;
      }
      res.status(200).json(subCategory);
    });
  });

  // /v1/product/update/:id - Update 1
  api.put('/:id', _authMiddleware.authenticate, function (req, res) {
    _subcategory2.default.findById(req.params.id, function (err, subCategory) {
      if (err) {
        res.status(500).json({ message: 'An error has occured ' + err.message });
        return;
      }
      subCategory.categoryId = req.body.catagoryId;
      subCategory.subCategoryTitle = req.body.subCategoryTitle;

      subCategory.save(function (err) {
        if (err) {
          res.status(500).json({ messsage: 'An error has occured ' + err.message });
          return;
        }
        res.status(200).json({ message: 'Subcategory updated successfully' });
      });
    });
  });

  // // /v1/subcategory/byCategory/:categoryId Read
  // api.get('/byCategory/:categoryId', authenticate, (req, res) => {
  //   SubCategory.find({'categoryId': req.params.categoryId}, (err, subCategory) => {
  //     if (err) {
  //       res.status(500).json({message: err});
  //       return;
  //     }
  //       res.status(200).json(subCategory);
  //   });
  // });

  // /v1/product/:id Delete 1
  api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
    _subcategory2.default.findById(req.params.id, function (err, subCategory) {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      _subcategory2.default.remove(req.params.id, function (err, subCategory) {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        res.status(200).json({ message: 'Subcategory: ' + subCategory._id + ' deleted successfully' });
      });
    });
  });

  return api;
};
//# sourceMappingURL=subcategory.js.map