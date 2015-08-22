'use strict';

var wsNinja = angular.module('app', [
  'ui.router', 'ngResource', 'ngAnimate',
  'ngSanitize', 'angular-loading-bar',
]);

wsNinja.run(
  [
    '$rootScope', '$state',
    function($rootScope, $state) {
      $rootScope.$state = $state;
      $rootScope.$on('$routeChangeSuccess', function(event, data) {
        data.$promise.then(function(res) {
          $rootScope.$state.current.data.pageMeta = res.meta;
        });
      });
    },

  ]
);

wsNinja.config(function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = true;
});

wsNinja.controller('NavCtrl', function($scope, $state) {
  $scope.isActive = function(state) {
    return $state.current.name.indexOf(state) !== -1;
  };
});
