(function() {
  'use strict';
  var wsNinja = angular.module('app');

  wsNinja.controller('PostsListCtrl', function($scope, Posts) {
    $scope.posts = Posts.list();
  });

})();
