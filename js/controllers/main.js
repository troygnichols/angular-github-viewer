(function() {
  var app = angular.module('githubViewer');

  var MainController = [
    "$scope", "$interval", "$log", "$location",

    function($scope, $interval, $log, $location, github) {
      var decrementCountdown = function() {
        $scope.countdown -= 1;
        if ($scope.countdown < 1) {
          $scope.username = "angular";
          $scope.search( $scope.username );
        }
      };

      var countdownInterval = null;

      var startCountdown = function() {
        countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
      };

      var cancelCountdown = function() {
        if (countdownInterval) {
          $interval.cancel(countdownInterval);
        }
        $scope.countdown = null;
      };

      $scope.search = function(username) {
        cancelCountdown();
        $location.path("/users/" + username);
      }

      $scope.countdown = 5;
      startCountdown();
    }
  ];

  app.controller("MainController", MainController);
})();
