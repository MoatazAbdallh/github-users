(function () {
    'use strict';
    angular.module("githubUsers").service("UsersList", UsersList);

    /* @ngInject */
    function UsersList($http, $q, toastr, CONFIG) {
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
                deferred.resolve(result.data.data);
            }, function (err) {
                toastr.error("Sorry Couldn't load user list, Please Try Again Later", 'Error');
                deferred.reject(err.message);
            });
            return deferred.promise;
        };
    }
})();
