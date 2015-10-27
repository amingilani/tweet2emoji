var app = angular.module("myapp", []);

app.controller('MyCtrl', function($scope) {
  // the tweets for the admin panel
  $scope.tweets = [
  ];
  $scope.addNewItem = function(newItem) {
    $scope.tweets.push(angular.copy(newItem));
    console.log("added item to tweets");
  };

  // the tweets for the display panel
  $scope.display = [
  ];
  $scope.addToDisplay = function(newItem) {
    $scope.display.push(angular.copy(newItem));
    console.log("added item to display");
  };

});
app.filter('reverse', function() {
  return function(tweets) {
    return tweets.slice().reverse();
  };
});
