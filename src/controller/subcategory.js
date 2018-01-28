import mongoose from 'mongoose';
import { Router } from 'express';
import SubCategory from '../model/subcategory';
import Category from '../model/category';
import bodyParser from 'body-parser';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  ///v1/subcategory/add/:categoryId - Create
  api.post('/add/:id', authenticate, (req, res) => {
    Category.findById(req.params.id, (err, category) => {
      if (err) {
        res.status(500).json({message: err});
        return;
      }

      let newSubCategory= new SubCategory();
      newSubCategory.categoryId = category._id
      newSubCategory.subCategoryTitle = req.body.subCategoryTitle;
      newSubCategory.save(err => {
        if (err) {
          res.status(500).json({message: `An error has occured ${err. message}`});
          return;
        }
          res.status(200).json({message: 'Subcategory saved successfully'});
      });
    });
  });

  // /v1/subcategory/:id Read 1
  api.get('/', authenticate, (req, res) => {
    SubCategory.find({}, (err, subCategory) => {
      if (err) {
        res.status(500).json({message: `An error has occured ${err. message}`});
        return;
      }
        res.status(200).json(subCategory);
    });
  });

// v1/subcategory/byCategory/:categoryId
api.get('/bycategory/:id', (req, res) => {
  SubCategory.find({ categoryId: req.params.id}, (err, subCategory) => {
    if (err) {
      res.status(500).json({message: `An error has occured ${err. message}`});
      return;
    }
      res.status(200).json(subCategory);
  });
});

  // /v1/product/update/:id - Update 1
  api.put('/:id', authenticate, (req, res) => {
    SubCategory.findById(req.params.id, (err, subCategory) => {
      if (err) {
        res.status(500).json({message: `An error has occured ${err. message}`});
        return;
      }
      subCategory.categoryId = req.body.catagoryId;
      subCategory.subCategoryTitle = req.body.subCategoryTitle;

        subCategory.save(err => {
            if (err) {
              res.status(500).json({messsage: `An error has occured ${err. message}`});
              return;
            }
              res.status(200).json({message: 'Subcategory updated successfully'});
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
  api.delete('/:id', authenticate, (req, res) => {
    SubCategory.findById(req.params.id, (err, subCategory) => {
      if (err) {
        res.status(500).json({message: err});
        return;
      }
      SubCategory.remove(req.params.id, (err, subCategory) => {
        if (err) {
          res.status(500).json({message: err});
          return;
        }
          res.status(200).json({message: `Subcategory: ${subCategory._id} deleted successfully`});
      });
    });
  });


  return api;
}
