var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var config = require('./config/config');
var log = require('./lib/logger');
var trackTerm = require('./lib/trackTerm');

// setup the app
require('./config/express')(app, config);

http.listen(config.port, function () {
  log.info('Express server listening on port ' + config.port);
});

// setup socket.io
io.on('connection', function(socket){
  log.debug('a user connected');

  // track a term
  trackTerm('tweet2emoji', function(err, tweet) {

    // log errors
    if (err) return log.error(err);

    // emit tweets
      socket.emit('tweet', tweet);
      log.debug("Delivered tweet", tweet);
  });


});
