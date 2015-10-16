var express = require('express');
var config = require('./config/config');
var log = require('./lib/logger');
var trackTerm = require('./lib/trackTerm');

var app = express();

// setup the app
require('./config/express')(app, config);

app.listen(config.port, function () {
  log.info('Express server listening on port ' + config.port);
});

// track a term
trackTerm('obama', function(err, tweet) {
  if (err) log.warning(err);
  if (tweet) log.debug("@" + tweet.user.screen_name + " says: " + tweet.text);
});
