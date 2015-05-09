'use strict';

var wsNinja = angular.module('app');

wsNinja.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.when('', '/');
  $stateProvider
  // === GENERAL
  .state('home', {
    url: '/',
    templateUrl: 'views/home.html',
  })
  .state('tech', {
    url: '/tech',
    templateUrl: 'views/tech.html',
  })
  .state('projects', {
    url: '/projects',
    templateUrl: 'views/projects.html',
  })
  .state('about', {
    url: '/about',
    templateUrl: 'views/about.html',
  })
  .state('404', {
    url: '/404',
    templateUrl: 'views/404.html'
  });

  $urlRouterProvider.otherwise('404');
  $locationProvider.html5Mode(false);
});
