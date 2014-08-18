(function() {
  var app = angular.module('githubViewer');

  app.config([
    '$routeProvider',
    function($routeProvider) {

      $routeProvider
        .when('/main', {
          templateUrl: 'main.html',
          controller: 'MainController'
        })
        .when('/users/:username', {
          templateUrl: 'user.html',
          controller: 'UserController'
        })
        .when('/repos/:username/:repo', {
          templateUrl: 'repo.html',
          controller: 'RepoController'
        })
        .otherwise({
          redirectTo: '/main'
        });
    }
  ]);
})();
