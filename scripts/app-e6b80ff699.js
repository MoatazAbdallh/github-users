(function () {
    'use strict';
    angular.module('githubUsers', ['ui.router', 'toastr','infiniteScroll']);
})();

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
        usersList: "=",
        userDetailAction: "&"
      },
      controller: userWidgetListController,
      controllerAs: 'vm',
      bindToController: true
    };
    /* @ngInject */
    function userWidgetListController($timeout,$scope) {
      var vm = this;
      vm.getUserInfo = getUserInfo;

      function getUserInfo(user, index) {
        vm.selectedIndex = index;
        vm.userDetailAction({user: user})
      }

    }


  }
})();

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

angular.module('infiniteScroll', [])
  .directive('infiniteScroll', ["$window", function ($window) {
    return {
      scope: {
        scrollHeight: '=',
        infiniteScroll: '&'
      },
      link: function (scope, element, attrs) {
        var offset = parseInt(attrs.threshold) || 0;
        var e = element[0];
        $(e).css('height', scope.scrollHeight)
        element.bind('scroll', function () {
          if (scope.$eval(attrs.canLoad) && e.scrollTop + e.offsetHeight >= e.scrollHeight - offset) {
            scope.infiniteScroll();
          }
        });
      }
    };
  }]);

(function () {
    'use strict';

    angular.module('githubUsers').run(runBlock);

    /** @ngInject */
    function runBlock($log) {
        $log.debug('runBlock end');
    }
})();

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

/* global moment:false */
(function () {
    'use strict';
    angular.module('githubUsers').constant('moment', moment);
})();

(function () {
    'use strict';

    angular.module('githubUsers').config(config);

    /** @ngInject */
    function config($logProvider, toastrConfig) {
        $logProvider.debugEnabled(true);
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 3000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = true;
        toastrConfig.progressBar = true;
    }
})();

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

angular.module('githubUsers').run(['$templateCache', function($templateCache) {$templateCache.put('app/states/main/main.html','<div class="container-wrapper"><div class="header-wrapper"><div class="app-icon-wrapper"><i class="fa fa-github" aria-hidden="true"></i></div><div class="app-title">Github Users</div><div class="app-menu"><i class="fa fa-bars" aria-hidden="true"></i></div></div><div class="body-wrapper"><div infinite-scroll="vm.loadMoreUsers()" threshold="200" can-load="true" class="user-list-wrapper"><div user-widget-list="" users-list="vm.githubUsers" user-detail-action="vm.showUserDetail(user)"></div></div><div class="user-info-wrapper"><user-widget-detail user-detail="vm.user"></user-widget-detail></div></div></div>');
$templateCache.put('app/components/directives/user-widget-detail/user-widget-detail.html','<div class="user-widget-detail-wrapper"><div class="user-widget-detail-header"><h2><span>User Info</span></h2></div><div class="user-widget-detail-avatar"><img src="assets/images/avatar-placeholder.png"></div><div class="user-widget-detail-bio"><div class="user-widget-detail-bio-label"><div>Label</div><div ng-bind="vm.userDetail.name"></div></div><div class="user-widget-detail-bio-desc"><div>Bio</div><div ng-bind="vm.userDetail.bio"></div></div></div></div>');
$templateCache.put('app/components/directives/user-widget-list/user-widget-list.html','<div class="user-widget-wrapper"><div ng-repeat="user in vm.usersList" ng-bind="user.name" class="user-widget-name-wrapper" ng-click="vm.getUserInfo(user,$index)" ng-class="{\'user-widget-selected\':$index==vm.selectedIndex}"></div></div>');}]);