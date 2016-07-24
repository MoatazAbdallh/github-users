(function () {
  'use strict';
  angular.module("githubUsers").controller("MainController", MainController);

  /* @ngInject */
  function MainController(UsersList, $scope, $timeout) {
    var vm = this;
    vm.counterScrolling = 0;
    vm.loadMoreUsers = loadMoreUsers;
    vm.showUserDetail = showUserDetail;
    UsersList.getGithubUsers().then(function (result) {
      vm.originalGithubUsers = result;
      vm.githubUsers = result.slice(0, 20);

    });
    function showUserDetail(user) {
      vm.user = user;
    }

    function loadMoreUsers() {
      vm.counterScrolling++;
      vm.githubUsers = vm.originalGithubUsers.slice(0, vm.githubUsers.length + 20);
      $scope.$apply()
    }
  }


})();
