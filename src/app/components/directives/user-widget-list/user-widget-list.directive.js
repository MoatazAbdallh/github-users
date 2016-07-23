(function () {
    'use strict';
    angular.module("githubUsers")
        .directive("userWidgetList", userWidgetList);

    /* @ngInject */
    function userWidgetList(UsersList, $rootScope) {
        return {
            restrict: "EA",
            templateUrl: "app/components/directives/user-widget-list/user-widget-list.html",
            scope: {
                usersList: "="
            },
            controller: userWidgetListController,
            controllerAs: 'vm',
            bindToController: true
        };
        function userWidgetListController() {
            var vm = this;

        }
    }
})();
