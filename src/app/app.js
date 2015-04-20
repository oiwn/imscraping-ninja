'use strict';

var wsNinja = angular.module('app', [
  'ui.router', 'ngAnimate',
  'angular-loading-bar'
]);

wsNinja.config(function (cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = true;
});

wsNinja.controller('NavCtrl', function($scope, $state) {
  $scope.isActive = function (state) {
    return state === $state.current.name;
  };
});
