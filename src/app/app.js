'use strict';

var wsNinja = angular.module('app', [
  'ui.router', 'ngAnimate',
  'angular-loading-bar'
]);

wsNinja.config(function (cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = true;
});
