import mongoose from 'mongoose';
import { Router } from 'express';
import Category from '../model/category';
import bodyParser from 'body-parser';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // /v1/category/add Create
  api.post('/add', authenticate, (req, res) => {

    let newCategory = new Category();
    newCategory.submittedById = req.body.submittedById;
    newCategory.categoryTitle = req.body.categoryTitle;
    newCategory.categoryDescription = req.body.categoryDescription;
    newCategory.recommended = req.body.recommended;


    newCategory.save(err => {
      if (err) {
        res.status(500).json({message: err});
        return;
      }
        res.status(200).json({message: 'Category saved successfully'});
    });
  });

  // /v1/category/ Read
  api.get('/', authenticate, (req, res) => {
    Category.find({}, (err, category) => {
      if (err) {
        res.status(500).json({message: `An erro has occured ${err.message}`});
        return;
      }
        res.status(200).json(category);
    });
  });

  // /v1/category/:id Update
  api.put('update/:id', authenticate, (req, res) => {
    Category.findById(req.params.id, (err, category) => {
      if (err) {
        res.status(500).json({message: err});
        return;
      }
        category.submittedById = req.body.submittedById;
        category.categoryTitle = req.body.categoryTitle;
        category.categoryDescription = req.body.categoryDescription;
        category.recommended = req.body.recommended;

        category.save(err => {
          if (err) {
            res.status(500).json({message: err});
            return;
          }
            res.status(200).json({message: 'Category updated successfully'});
      });
    });
  });

  // /v1/category/:id Delete 1
  api.delete('delete/:id', authenticate, (req, res) => {
    Category.findById({_id: req.params.id}, (err, category) => {
      if (err) {
        res.status(500).json({message: err});
        return;
      }
        res.status(200).json({message: 'Category deleted successfully'});
    });
  });


  return api;
}
