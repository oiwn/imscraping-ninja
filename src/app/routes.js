'use strict';

var wsNinja = angular.module('app');

wsNinja.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.when('', '/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      data: {
        showLogo: true,
        pageMeta: {
          title: 'Web Scraping Service',
          description: 'Web scraping and data collection service',
          keywords: [
            'web scraping', 'data scraping', 'web crawling',
            'data extractions', 'government open data',
          ],
        },
      },
    })
    .state('tech', {
      url: '/tech',
      templateUrl: 'views/tech.html',
      data: {
        pageMeta: {
          title: 'Technologies used for web scraping',
          description: 'Tools and libraries used to build awesome web scrapers',
          keywords: ['awesome web scraping', 'web scraping tools'],
        },
      },
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      data: {
        pageMeta: {
          title: 'About me, and my blog',
          description: 'About me and my blog',
          keywords: [
            'about me', 'and my blog', 'gulp',
            'node.js', 'angularjs', 'statig site generator',
          ],
        },
      },
    })

    // Posts list and details
    .state('blog', {
      url: '/posts',
      templateUrl: 'views/posts.html',
      controller: 'PostsListCtrl',
      data: {
        pageMeta: {
          title: 'Articles about data scraping',
          description: 'Posts and notes about web scraping, data collection and data science',
          keywords: [
            'web scraping articles', 'web scraping tools', 'web crawler technologies',
          ],
        },
      },
    })
    .state('blog_details', {
      url: '/posts/:id',
      templateUrl: 'views/postDetails.html',
      controller: 'PostDetailsCtrl',
      data: {pageMeta: {}},
    })

    // Projects list
    .state('projects', {
      url: '/projects',
      templateUrl: 'views/projects.html',
      controller: 'ProjectsListCtrl',
      data: {
        pageMeta: {
          title: 'Web scraping projects i done',
          description: 'List of my web scraping projects',
          keywords: [
            'web scraping projects', 'booking websites scraping', 'app stores crawling',
            'fx data scraping', 'e-commerce sites scraping',
          ],
        },
      },
    })

  .state('404', {
    url: '/404',
    templateUrl: 'views/404.html',
    pageMeta: {
      title: 'Wrong url buddy...',
      description: 'There is no router defubed for this url',
    },
  });

  $urlRouterProvider.otherwise('404');
  $locationProvider.html5Mode(true).hashPrefix('!');
});
