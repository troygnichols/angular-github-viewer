(function() {
  var app = angular.module('githubViewer');

  var GITHUB_USERNAME = "<your_github_username>";
  var GITHUB_PASSWORD = "<your_github_password>";

  app.factory('github', [ '$http', 'base64',
    function($http, base64) {

      var setupAuthentication = function() {
        $http.defaults.headers.common['Authorization'] = 'Basic ' +
          base64.encode(GITHUB_USERNAME + ":" + GITHUB_PASSWORD);
      };

      setupAuthentication();

      return {
        getUser: function(username) {
          return $http.get("https://api.github.com/users/" + username).then(function(response) {
            return response.data;
          });
        },

        getRepos: function(user) {
          return $http.get(user.repos_url).then(function(response) {
            return response.data;
          });
        },

        getRepo: function(username, repo) {
          var url = "https://api.github.com/repos/" + username + "/" + repo;
          return $http.get(url).then(function(response) {
            return response.data;
          });
        },

        getCollaborators: function(repo) {
          var url = "https://api.github.com/repos/" + repo.full_name + "/collaborators";
          return $http.get(url).then(function(response) {
            return response.data;
          });
        }
      };
    }
  ]);
})();
