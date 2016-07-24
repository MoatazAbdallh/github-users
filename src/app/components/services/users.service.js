(function () {
  'use strict';
  /**
   * @ngdoc service
   * @name githubUsers.UsersList
   * @requires $http,toastr,CONFIG
   **/
  angular.module("githubUsers").service("UsersList", UsersList);

  /* @ngInject */
  function UsersList($http, $q, toastr, CONFIG) {

    /**
     * @ngdoc method
     * @name githubUsers.UsersList#getGithubUsers
     * @methodOf ng.service
     * @returns {Array[Object]} Return list of github users
     */
    this.getGithubUsers = function () {
      var deferred = $q.defer();
      $http({
        url: "config/users-mock.json",
        method: "GET",
        data: {
          token: CONFIG.token
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (result) {
        deferred.resolve(result.data.users);
      }, function (err) {
        toastr.error("Sorry Couldn't load user list, Please Try Again Later", 'Error');
        deferred.reject(err.message);
      });
      return deferred.promise;
    };
  }
})();
