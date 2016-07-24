(function () {
  'use strict';
  angular.module("githubUsers")
    .directive("userWidgetDetail", userWidgetDetail);

  /* @ngInject */
  function userWidgetDetail(UsersList, $rootScope) {
    return {
      restrict: "EA",
      templateUrl: "app/components/directives/user-widget-detail/user-widget-detail.html",
      scope: {
        userDetail: "="
      },
      controller: userWidgetDetailController,
      controllerAs: 'vm',
      bindToController: true
    };
    /* @ngInject */
    function userWidgetDetailController($scope) {
      var vm = this;
    }
  }
})();
