var app = angular.module("myapp", []);

app.controller('MyCtrl', ['$scope', '$interval', function($scope, $interval) {
  // the tweets for the admin panel
  $scope.tweets = [];
  $scope.addNewItem = function(newItem) {
    $scope.tweets.push(angular.copy(newItem));
    console.log("added item to tweets");
  };

  // the tweets for the display panel
  $scope.display = [];
  $scope.currentDisplay = {};
  $scope.addToDisplay = function(newItem) {
    $scope.display.push(angular.copy(newItem));
    console.log("added item to display");
  };

  // set the refresh interval
  $interval(function() {
    var pointer = $scope.display
      .shift();
    if (pointer === undefined) {
    $scope.currentDisplay.emoji = "";
    console.log("Nothing to display");
    } else {
      pointer.tweet = JSON.parse(pointer.tweet);
      pointer.emoji = emojione.unicodeToImage(pointer.emoji)+" "+"<h1 style='margin-left='50px''>@" + pointer.tweet.user.screen_name + "</h1>";
      console.log(pointer.emoji+"<img src='lib\img\Pepsi-can.png' height='300px' style='margin-left:500px;margin-top:290px;position: absolute;clip: rect(100, 100px, 100px, 100px);'/>")
    $scope.currentDisplay = pointer;
      console.log("Shifting from display to currentDisplay");

  }
}, 10 * 1000);

}]);
app.filter('reverse', function() {
  return function(tweets) {
    return tweets.slice().reverse();
  };
});

app.filter('unsafe', function($sce) {
  return function(val) {
    return $sce.trustAsHtml(val);
  };
});
