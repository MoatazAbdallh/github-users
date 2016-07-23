(function () {
  'use strict';

  describe('controllers', function () {
    var vm;
    var scope;
    var directiveElem;
    var compile;
    var httpBackend;
    var commentListService;
    beforeEach(module('commentWidget', function ($provide) {
      $provide.constant('CONFIG', {
        "app_name": "Demo1",
        "app_id": "AZ78o",
        "base_url": "https://comment-widget.test.com/"
      });

    }));
    beforeEach(inject(function ($rootScope, $compile, $httpBackend,_CommentsList_) {
      scope = $rootScope.$new();
      compile = $compile;
      httpBackend = $httpBackend;
      commentListService = _CommentsList_;
      httpBackend.expectPOST('https://comment-widget.test.com/get-comment-list').respond(200, {
        "errorCode": 0,
        "errorMessage": "",
        "data": [{
          "_id": "57573dd0d7d19d8c1f1a83bd",
          "user_name": "moataz",
          "comment_txt": "Hello Every One",
          "points_up": 2,
          "points_down": 2,
          "creation_date": "2016-06-07T21:34:08.342Z",
          "__v": 0,
          "replies": []
        }, {
          "_id": "57573f8b51a6e65c2c89e25e",
          "user_name": "moataz",
          "comment_txt": "Hello Every One",
          "points_up": 0,
          "points_down": 0,
          "creation_date": "2016-06-07T21:41:31.719Z",
          "__v": 0,
          "replies": []
        }]
      });
      directiveElem = getCompiledElement();

    }));

    it('should applied template', function () {
      expect(directiveElem.html()).not.toEqual('');
      httpBackend.flush();
    });

    function getCompiledElement() {
      var element = angular.element(' <div class="comment-widget-main-list" comment-widget-list></div>');

      var compiledElement = compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }
  });
})();
