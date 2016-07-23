(function () {
    'use strict';
    angular.module('githubUsers').config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/states/main/main.html',
                controller: 'MainController',
                controllerAs: 'vm'
            });
        $urlRouterProvider.otherwise('/');
    }
})();
