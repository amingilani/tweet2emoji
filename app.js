var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var config = require('./config/config');
var log = require('./lib/logger');
var trackTerm = require('./lib/trackTerm');
var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();


// setup the app
require('./config/express')(app, config);

http.listen(config.port, function() {
  log.info('Express server listening on port ' + config.port);
});

// setup socket.io
io.on('connection', function(socket) {
  log.debug('a user connected');

  // send out tweets when they happen
  ee.on("twitter", function (tweet) {
      socket.emit('tweet', tweet);
      log.debug("Sent out tweet", tweet);
  });

  // when an admin broadcasts a new tweet
  socket.on("display", function(displayTweet) {
    log.debug(displayTweet);
    socket.broadcast.emit("display", displayTweet);
    log.debug("Sent a tweet to the display", displayTweet);
  });
});

// track a term
trackTerm('tweet2emoji', function(err, tweet) {
  // log errors
  if (err) return log.error(err);
  // emit tweets
  ee.emit('twitter', tweet);
//  log.debug("Heard a tweet", tweet);
});
