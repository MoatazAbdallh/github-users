(function () {
  'use strict';
  angular.module("githubUsers").controller("MainController", MainController);

  /* @ngInject */
  function MainController(UsersList) {
    var vm = this;
    vm.showUserDetail = showUserDetail;
    UsersList.getGithubUsers().then(function (result) {
      vm.githubUsers = result;
    });
  }
  function showUserDetail(){
    alert("aaaaa")
  }
})();
