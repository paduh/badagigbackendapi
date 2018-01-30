require('dotenv').config;
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import socket from 'socket.io';
import PrivateMessage from './model/privatemessage';
import ChannelMessage from './model/channelmessage';
import Channel from './model/channel';
import UserDataExt from './controller/extensions/userData-ext';
import User from './model/user';
//import FacebookTokenStrategy from 'passport-token-facebook';
import { generateAccessToken, respond, authenticate } from './middleware/authMiddleware'

const LocalStrategy  = require('passport-local').Strategy;
var GoogleTokenStrategy =  require('passport-google-oauth20').Strategy;
var FacebookTokenStrategy =  require('passport-facebook-token');


import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);
let io = socket(app.server);

//middleware
//parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}));

//local passport config
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  Account.authenticate()
));

//GoogleTokenStrategy
// passport.use(new GoogleTokenStrategy({
//   clientID: config.googleClientID,
//   clientSecret: config.googleClientSecret,
//   callbackURL: "http://localhost:4010/auth/google/callback"
// }, (accessToken, refreshToken, profile, done) => {
//   User.findOne({googleId: profile.id}, (err, user) => {
//     if (err) {
//       //res.status(500).json({message: `An error has occured: ${err.message}`});
//       return done(err, false);
//     }
//     else if (!err && user !== null) {
//       return done(false, user);
//     }
//     else {
//       user = new User({username: profile.email});
//       user.googleId = profile.id;
//       user.firstname = profile.name.givenname;
//       user.lastname = profile.name.familyname;
//       user.email = profile.email;
//
//       user.save(err => {
//         if (err) {
//           res.status(500).json({message: `An error has occured: ${err.message}`});
//           return done(err, false);
//         } else {
//           res.status(200).json({message: `New user added from facebook successfully`});
//           return done(null, user);
//         }
//       })
//     }
//   });
// }
// ));

//FacebookTokenStrategy
passport.use(new FacebookTokenStrategy({
  clientID: config.facebookClientID,
  clientSecret: config.facebookClientSecret
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({facebookId: profile.id}, (err, user) => {
      if (err) {
        res.status(409).json({ message: `An error occured: ${err.message}`});
        return done(err, false);
      }
      else if (!err && user !== null) {
        return done(null, user);
      }
      else {
        user = new User();
        console.log(`Profile id ${profile.id}`);
        console.log(`Profile name ${profile.name.givenName}`);
        console.log(`Profile email ${profile.emails[0].value}`);
        user.facebookId = profile.id;
        user.firstname = profile.name.givenName;
        user.lastname = profile.name.familyName;
        user.email = profile.emails[0].value;
        user.save(err => {
          if (err) {
            console.log(`Error`);
              //res.status(500).json({message: `An error has occured: ${err.message}`});
              return done(err, false);
          }
            console.log(`Success`);
            generateAccessToken, respond;
            return done(null, user);
        })

      }
  });
}
));


passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());



//api routes v1
app.use('/v1', routes);

// Base URL test endpoint to see if API is running
app.get('/', (req, res) => {
  res.json({ message: 'BadaGig API is ALIVE!' })
});

/*||||||||||||||||SOCKET|||||||||||||||||||||||*/
//Listen for connection
var typingUsers = {};

io.on('connection', function(client) {
  console.log('a user connected');
  //Listens for a new chat message
  client.on('newChannel', function(name, description) {
    //Create channel
    let newChannel = new Channel({
    name: name,
    description: description,
  });
    //Save it to database
    newChannel.save(function(err, channel){
      //Send message to those connected in the room
      console.log('new channel created');
      io.emit("channelCreated", channel.name, channel.description, channel.id);
    });
  });

  //Listens for user typing.
  client.on("startType", function(userName, channelId){
    console.log("User " + userName + " is writing a message...");
    typingUsers[userName] = channelId;
    io.emit("userTypingUpdate", typingUsers, channelId);
  });

  client.on("stopType", function(userName){
    console.log("User " + userName + " has stopped writing a message...");
    delete typingUsers[userName];
    io.emit("userTypingUpdate", typingUsers);
  });

  //listens for a new private chat message
  client.on('newPrivateMessage', function(messageBody, userName, senderId, receipientId, profilePicUrl) {
    // Create message

    console.log(messageBody);

    let newMessage = new PrivateMessage({
      messageBody: messageBody,
      senderId: senderId,
      userName: userName,
      receipientId: receipientId,
      profilePicUrl: profilePicUrl
    });
      //Save it to database
      newMessage.save(function(err, msg) {
        if (err) {
          console.log(err);
        }
          console.log('new message sent');
          io.emit("PrivateMessageCreated", msg.messageBody, msg.userName, msg.senderId, msg.receipientId, msg.profilePicUrl)
      });
  });

  //Listens for a new channel chat message
  client.on('newChannelMessage', function(messageBody, userName, senderId, receipientId, profilePicUrl) {
    //Create message

    console.log(messageBody);

    let newMessage = new ChannelMessage({
    messageBody: messageBody,
    userId: userId,
    channelId: channelId,
    userName: userName,
    userAvatar: userAvatar,
    userAvatarColor: userAvatarColor
  });
    //Save it to database
    newMessage.save(function(err, msg){
      //Send message to those connected in the room
      console.log('new message sent');

      io.emit("channelMessageCreated",  msg.messageBody, msg.userId, msg.userName, msg.channelId, msg.userName, msg.userAvatar, msg.userAvatarColor, msg.id, msg.timeStamp);
    });
  });
});
/*||||||||||||||||||||END SOCKETS||||||||||||||||||*/

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

module.exports = {
  app,
  io
}
