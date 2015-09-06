/*global angular*/
(function() {
  'use strict';
  var wsNinja = angular.module('app');

  wsNinja.service('Posts', function($resource) {
    return $resource(
      '/content/posts/:id.json',
      {id: '@id'},
      {
        list: {
          method: 'GET',
          isArray: true,
          url: '/content/posts-list.json',
          transformResponse: function(data) {
            return angular.fromJson(data);
          },
        },
        find: {
          method: 'GET',
          isArray: false,
          url: '/content/posts/:id.json',
          transformResponse: function(data) {
            try {
              return angular.fromJson(data);
            }
            catch (err) {
              window.location = '/404';
            }
          },
        },
      }
    );
  });

}());
