/*global angular*/
(function() {

  'use strict';
  var wsNinja = angular.module('app');

  wsNinja.service('Projects', function($resource) {
    return $resource(
      '/content/projects-list.json',
      {},
      {
        list: {
          method: 'GET',
          isArray: true,
          url: '/content/projects-list.json',
          transformResponse: function(data) {
            return angular.fromJson(data);
          },
        },
      }
    );
  });

}());
