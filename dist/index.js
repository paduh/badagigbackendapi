'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _privatemessage = require('./model/privatemessage');

var _privatemessage2 = _interopRequireDefault(_privatemessage);

var _channelmessage = require('./model/channelmessage');

var _channelmessage2 = _interopRequireDefault(_channelmessage);

var _channel = require('./model/channel');

var _channel2 = _interopRequireDefault(_channel);

var _userDataExt = require('./controller/extensions/userData-ext');

var _userDataExt2 = _interopRequireDefault(_userDataExt);

var _user = require('./model/user');

var _user2 = _interopRequireDefault(_user);

var _authMiddleware = require('./middleware/authMiddleware');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config;
//import FacebookTokenStrategy from 'passport-token-facebook';


var LocalStrategy = require('passport-local').Strategy;
var GoogleTokenStrategy = require('passport-google-oauth20').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);
var io = (0, _socket2.default)(app.server);

//middleware
//parse application/json
app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));

//local passport config
app.use(_passport2.default.initialize());
var Account = require('./model/account');
_passport2.default.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, Account.authenticate()));

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
_passport2.default.use(new FacebookTokenStrategy({
  clientID: process.env.FACEBOOKCLIENTID,
  clientSecret: _config2.default.facebookClientSecret
}, function (accessToken, refreshToken, profile, done) {
  _user2.default.findOne({ facebookId: profile.id }, function (err, user) {
    if (err) {
      res.status(409).json({ message: 'An error occured: ' + err.message });
      return done(err, false);
    } else if (!err && user !== null) {
      return done(null, user);
    } else {
      user = new _user2.default();
      console.log('Profile id ' + profile.id);
      console.log('Profile name ' + profile.name.givenName);
      console.log('Profile email ' + profile.emails[0].value);
      user.facebookId = profile.id;
      user.firstname = profile.name.givenName;
      user.lastname = profile.name.familyName;
      user.email = profile.emails[0].value;
      user.save(function (err) {
        if (err) {
          console.log('Error');
          //res.status(500).json({message: `An error has occured: ${err.message}`});
          return done(err, false);
        }
        console.log('Success');
        _authMiddleware.generateAccessToken, _authMiddleware.respond;
        return done(null, user);
      });
    }
  });
}));

_passport2.default.serializeUser(Account.serializeUser());
_passport2.default.deserializeUser(Account.deserializeUser());

//api routes v1
app.use('/v1', _routes2.default);

// Base URL test endpoint to see if API is running
app.get('/', function (req, res) {
  res.json({ message: 'BadaGig API is ALIVE!' });
});

/*||||||||||||||||SOCKET|||||||||||||||||||||||*/
//Listen for connection
var typingUsers = {};

io.on('connection', function (client) {
  console.log('a user connected');
  //Listens for a new chat message
  client.on('newChannel', function (name, description) {
    //Create channel
    var newChannel = new _channel2.default({
      name: name,
      description: description
    });
    //Save it to database
    newChannel.save(function (err, channel) {
      //Send message to those connected in the room
      console.log('new channel created');
      io.emit("channelCreated", channel.name, channel.description, channel.id);
    });
  });

  //Listens for user typing.
  client.on("startType", function (userName, channelId) {
    console.log("User " + userName + " is writing a message...");
    typingUsers[userName] = channelId;
    io.emit("userTypingUpdate", typingUsers, channelId);
  });

  client.on("stopType", function (userName) {
    console.log("User " + userName + " has stopped writing a message...");
    delete typingUsers[userName];
    io.emit("userTypingUpdate", typingUsers);
  });

  //listens for a new private chat message
  client.on('newPrivateMessage', function (messageBody, userName, senderId, receipientId, profilePicUrl) {
    // Create message

    console.log(messageBody);

    var newMessage = new _privatemessage2.default({
      messageBody: messageBody,
      senderId: senderId,
      userName: userName,
      receipientId: receipientId,
      profilePicUrl: profilePicUrl
    });
    //Save it to database
    newMessage.save(function (err, msg) {
      if (err) {
        console.log(err);
      }
      console.log('new message sent');
      io.emit("PrivateMessageCreated", msg.messageBody, msg.userName, msg.senderId, msg.receipientId, msg.profilePicUrl);
    });
  });

  //Listens for a new channel chat message
  client.on('newChannelMessage', function (messageBody, userName, senderId, receipientId, profilePicUrl) {
    //Create message

    console.log(messageBody);

    var newMessage = new _channelmessage2.default({
      messageBody: messageBody,
      userId: userId,
      channelId: channelId,
      userName: userName,
      userAvatar: userAvatar,
      userAvatarColor: userAvatarColor
    });
    //Save it to database
    newMessage.save(function (err, msg) {
      //Send message to those connected in the room
      console.log('new message sent');

      io.emit("channelMessageCreated", msg.messageBody, msg.userId, msg.userName, msg.channelId, msg.userName, msg.userAvatar, msg.userAvatarColor, msg.id, msg.timeStamp);
    });
  });
});
/*||||||||||||||||||||END SOCKETS||||||||||||||||||*/

app.server.listen(_config2.default.port);
console.log('Started on port ' + app.server.address().port);

module.exports = {
  app: app,
  io: io
};
//# sourceMappingURL=index.js.map