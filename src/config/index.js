import mongodb from 'mongodb';

export default {
  "port": 5011,
  "mongoUrl": "mongodb://localhost:27017/badagig-api",
  // "port": process.env.PORT,
  // "mongoUrl": process.env.MONGODB_URI,
  "bodyLimit": "100kb"
}
