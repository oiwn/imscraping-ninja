/*global angular*/
(function() {
  'use strict';
  var wsNinja = angular.module('app');

  wsNinja.service('Posts', function($resource) {
    return $resource(
      '/content/posts-list.json',
      {},
      {
        list: {
          method: 'GET',
          isArray: true,
          url: '/content/posts-list.json',
          transformResponse: function(data) {
            return angular.fromJson(data);
          },
        },
      }
    );
  });

}());
