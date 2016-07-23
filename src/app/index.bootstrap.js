(function () {
    'use strict';
    var initInjector = angular.injector(["ng"]);
    var $http = initInjector.get("$http");

    $http.get("config/app-config.json").then(function (result) {
        angular.module('githubUsers').constant('CONFIG', result.data);
        angular.bootstrap(document, ["githubUsers"]);
    }, function (err) {
        angular.module('githubUsers').constant('CONFIG', {});
        toastr.error("Sorry Couldn't load Configuration, please try again later", 'Error');
    });
})();
