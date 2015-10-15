/*
Given a term, this lib will track it. Here's how you use it:

trackterm('tweet2emoji', function(err, tweet) {
  if (err) console.log(err);
  if (tweet) console.log(tweet);
});

*/


var Twitter = require('twitter');

// configure the client
var client = new Twitter({
  consumer_key: 'It7yXJMj6pb2nQQqYJ1I8zHwA',
  consumer_secret: '60heWk7Hz6ee2ky21slYWBxiEcvn6H9hJkm0MpC8dlmLALF84S',
  access_token_key: '392067902-3CMvluS2DRYT1rsKUqvhoYIcPkhmh6aD9hSxcOkv',
  access_token_secret: 'KKZZJ32KVieBdjh8cdNhDSeNhwBZujLlbdFqIdghgl5vO'
});

var trackterm = function(term, callback) {

  // stream statuses
  client.stream('statuses/filter', {
    track: term // track the term
  }, function(stream) {

    stream.on('error', function(error) {
      callback(error); // return the error as firm param
    });

    // return tweets as the second param
    stream.on('data', function(tweet) {
      callback(null, tweet.text); // return the tweet as second param
    });
  });
};

module.exports = trackterm;
