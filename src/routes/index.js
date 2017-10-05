import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initalizeDb from '../db';
import user from '../controller/user';
import account from '../controller/account';
import channel from '../controller/channel';
import privateMessage from '../controller/privatemessage';
import channelMessage from '../controller/channelmessage';
import subCategory from '../controller/subcategory';
import request from '../controller/request';
import category from '../controller/category';
import badaGig from '../controller/badagig';

let router = express();

//connect to db
initalizeDb(db => {

  //internal middleware
  router.use(middleware({ config, db }));

  //api routes v1 (/v1)
  router.use('/user', user({ config, db }));
  router.use('/account', account({ config, db }));
  router.use('/channel', channel({ config, db }));
  router.use('/privateMessage', privateMessage({ config, db }));
  router.use('/channelmessage', channelMessage({ config, db }));
  router.use('/subcategory', subCategory({ config, db }));
  router.use('/request', request({ config, db }));
  router.use('/category', category({ config, db }));
  router.use('/badagig', badaGig({ config, db}));
});

export default router;
