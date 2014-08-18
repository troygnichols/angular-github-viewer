(function() {
  var app = angular.module('githubViewer');

  var RepoController = [
    '$scope', '$log', '$routeParams', 'github',

    function($scope, $log, $routeParams, github) {
      var username = $routeParams.username;
      var repo = $routeParams.repo;

      var onRepoFound = function(repoData) {
        $log.info('Found repo data for ' + username + '/' + repo);

        $scope.repo = repoData;
        github.getCollaborators($scope.repo)
          .then(onCollaboratorsFound, onCollaboratorsError);
      };

      var onRepoError = function(reason) {
        $log.error('Could not fetch repo data for ' +
          username + '/' + repo + ', got response code: ' + reason.status);

        $scope.error = 'Could not find ' + username + '/' + repo +
          ' on github';
      };

      var onCollaboratorsFound = function(collaboratorsData) {
        $log.info('Found ' + collaboratorsData.length + ' collaborators for ' +
            username + '/' + repo);
        $scope.collaborators = collaboratorsData;
      };

      var onCollaboratorsError = function(reason) {
        $log.error('Could not fetch collaborators data for ' +
            username + '/' + repo + ' got response code: ' + reason.status);

        $scope.error = 'Could not fetch collaborators data for ' +
            username + '/' + repo + ' from github';
      };

      $log.info('Looking up repo: ' + username + '/' + repo + ' on github');
      github.getRepo(username, repo).then(onRepoFound, onRepoError);
    }
  ];

  app.controller('RepoController', RepoController);
})();
