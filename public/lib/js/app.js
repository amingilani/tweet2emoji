var app = angular.module("myapp", []);

app.controller('MyCtrl', function($scope) {
  $scope.tweets = [
    
  ];
  $scope.addNewItem = function(newItem) {
    $scope.tweets.push(angular.copy(newItem));
    console.log("added");
  };
});
app.filter('reverse', function() {
  return function(tweets) {
    return tweets.slice().reverse();
  };
});