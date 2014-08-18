(function() {
  var app = angular.module('githubViewer');

  var UserController = [
    "$scope", "$log", "$routeParams", "github",

    function($scope, $log, $routeParams, github) {

      var username = $routeParams.username;
      $scope.repoSortOrder = "-stargazers_count";

      var onUserFound = function(userData) {
        $log.info("Found user data for " + username);

        $scope.user = userData;
        github.getRepos($scope.user).then(onReposFound, onReposError);
      };

      var onUserLookupError = function(reason) {
        $log.error("Could not fetch user data for " + username
          + ", got response code: " + reason.status);

        $scope.error = "Could not find " + username + " on github";
      };

      var onReposFound = function(reposData) {
        $log.info("Found " + reposData.length  + " repos for " + username);
        $scope.repos = reposData;
      };

      var onReposError = function(reason) {
        $log.error("Could not fetch repos for " + username + ", reason: " + reason);
        $scope.error = "Could not fetch repos for " + username;
      };

      $log.info("Looking up " + username + " on github");
      github.getUser(username).then(onUserFound, onUserLookupError);
    }
  ];

  app.controller("UserController", UserController);
})();
