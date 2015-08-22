(function() {
  'use strict';
  var wsNinja = angular.module('app');

  wsNinja.controller('PostsListCtrl', function($scope, Posts) {
    $scope.posts = Posts.list();
  });

  wsNinja.controller('PostDetailsCtrl', function($scope, $stateParams, Posts) {
    $scope.post = Posts.find({id: $stateParams.id});
    $scope.$emit('$routeChangeSuccess', $scope.post);
  });

})();
