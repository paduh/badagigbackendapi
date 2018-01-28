'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

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

  // /v1/category/add Create
  api.post('/add', _authMiddleware.authenticate, function (req, res) {

    var newCategory = new _category2.default();
    newCategory.submittedById = req.body.submittedById;
    newCategory.categoryTitle = req.body.categoryTitle;
    newCategory.categoryDescription = req.body.categoryDescription;
    newCategory.recommended = req.body.recommended;

    newCategory.save(function (err) {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      res.status(200).json({ message: 'Category saved successfully' });
    });
  });

  // /v1/category/ Read
  api.get('/', _authMiddleware.authenticate, function (req, res) {
    _category2.default.find({}, function (err, category) {
      if (err) {
        res.status(500).json({ message: 'An erro has occured ' + err.message });
        return;
      }
      res.status(200).json(category);
    });
  });

  // /v1/category/:id Update
  api.put('update/:id', _authMiddleware.authenticate, function (req, res) {
    _category2.default.findById(req.params.id, function (err, category) {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      category.submittedById = req.body.submittedById;
      category.categoryTitle = req.body.categoryTitle;
      category.categoryDescription = req.body.categoryDescription;
      category.recommended = req.body.recommended;

      category.save(function (err) {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        res.status(200).json({ message: 'Category updated successfully' });
      });
    });
  });

  // /v1/category/:id Delete 1
  api.delete('delete/:id', _authMiddleware.authenticate, function (req, res) {
    _category2.default.findById({ _id: req.params.id }, function (err, category) {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    });
  });

  return api;
};
//# sourceMappingURL=category.js.map