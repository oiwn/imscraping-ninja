(function() {
  'use strict';
  var wsNinja = angular.module('app');

  wsNinja.controller('ProjectsListCtrl', function($scope, Projects) {
    $scope.projects = Projects.list();
  });
})();
