/*global angular*/
(function() {

  'use strict';
  var wsNinja = angular.module('app');

  wsNinja.service('Projects', function($resource) {
    return $resource(
      '/content/projects/:id.json',
      {id: '@id'},
      {
        list: {
          method: 'GET',
          isArray: true,
          url: '/content/projects-list.json',
          transformResponse: function(data) {
            return angular.fromJson(data);
          },
        },
        find: {
          method: 'GET',
          isArray: false,
          url: '/content/projects/:id.json',
          transformResponse: function(data) {
            try {
              return angular.fromJson(data);
            }
            catch (err) {
              console.log('Error convert project json data:', data);
              window.location = '/404';
            }
          },
        },
      }
    );
  });

}());
