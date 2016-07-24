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
