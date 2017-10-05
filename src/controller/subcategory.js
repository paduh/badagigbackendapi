import mongoose from 'mongoose';
import { Router } from 'express';
import SubCategory from '../model/subcategory';
import bodyParser from 'body-parser';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  ///v1/product/add - Create
  api.post('/add', authenticate, (req, res) => {
    let newSubcategory= new SubCategory;
    newProduct.categoryId = req.params.catagoryId;
    newProduct.subCategoryTitle = req.params.subCategoryTitle;

    newSubCategory.save(err => {
      if (err) {
        res.status(500).json({message: err});
      }
        res.status(200).json({message: 'Subcategory saved successfully'});
    });
  });

  // /v1/product/:id Read 1
  api.get('/:id', authenticate, (req, res) => {
    SubCategory.findById(req.params.id, (err, subCategory) => {
      if (err) {
        res.status(500).json({message: err});
      }
        res.status(200).json(subCategory);
    });
  });

  // /v1/product/update/:id - Update 1
  api.put('/:id', authenticate, (req, res) => {
    SubCategory.findById(req.params.id, (err, subCategory) => {
      if (err) {
        res.status(500).json({message: err});
      }
        subCategory.categoryId = req.params.categoryId;
        subCategory.subcategoryTitle = req.params.productTitle;

        subCategory.save(err => {
            if (err) {
              res.status(500).json({messsage: err});
            }
              res.status(200).json({message: 'Subcategory updated successfully'});
          });
      });
  });

  // /v1/subcategory/byCategory/:categoryId Read
  api.get('/byCategory/:categoryId', authenticate, (req, res) => {
    SubCategory.find({'categoryId': req.params.categoryId}, (err, subCategory) => {
      if (err) {
        res.status(500).json({message: err});
      }
        res.status(200).json({subCategory});
    });
  });

  // /v1/product/:id Delete 1
  api.delete('/:id', authenticate, (req, res) => {
    SubCategory.remove(req.params.id, (err, subCategory) => {
      if (err) {
        res.status(500).json({message: err});
      }
        res.status(200).json({message: 'Subcategory deleted successfully'});
    });
  });


  return api;
}
