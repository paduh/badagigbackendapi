import mongoose from 'mongoose';
import { Router } from 'express';
import Category from '../model/category';
import bodyParser from 'body-parser';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // /v1/category/add Create
  api.post('/add', authenticate, (req, res) => {
    let newCategory = new Category;
    newCategory.submittedById = req.params.submittedById;
    newCategory.categoryTitle = req.params.categoryTitle;
    newCategory.categoryDescription = req.params.categoryDescription;
    newCategory.updatedById = req.params.updatedById;

    newCategory.save(err => {
      if (err) {
        res.status(500).json({message: err});
      }
        res.status(200).json({message: 'Category saved successfully'});
    });
  });

  // /v1/category/ Read
  api.get('/', authenticate, (req, res) => {
    Category.find({}, (err, category) => {
      if (err) {
        res.status(500).json({message: err});
      }
        res.status(200).json({category});
    });
  });

  // /v1/category/:id Update
  api.put('/:id', (req, res) => {
    Category.findById(req.params.id, (err, category) => {
      if (err) {
        res.status(500).json({message: err});
      }
        category.submittedById = req.params.submittedById;
        category.updatedById = req.params.updatedById;
        category.categoryTitle = req.params.categoryTitle;
        category.categoryDescription = req.params.categoryDescription;

        category.save(err => {
          if (err) {
            res.status(500).json({message: err});
          }
            res.status(200).json({message: 'Category updated successfully'});
      });
    });
  });

  // /v1/category/:id Delete 1
  api.delete('/:id', (req, res) => {
    Category.findById({_id: req.params.id}, (err, category) => {
      if (err) {
        res.status(500).json({message: err});
      }
        res.status(200).json({message: 'Category deleted successfully'});
    });
  });


  return api;
}
