(function() {
  'use strict';
  var wsNinja = angular.module('app');

  wsNinja.controller('ProjectsListCtrl', function($scope, Projects) {
    $scope.projects = Projects.list();
  });

  wsNinja.controller('ProjectDetailsCtrl', function($scope, $stateParams, Projects) {
    $scope.project = Projects.find({id: $stateParams.id});
    $scope.$emit('$routeChangeSuccess', $scope.project);
  });

})();
