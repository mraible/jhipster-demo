'use strict';

angular.module('blogApp')
    .factory('BlogSearch', function ($resource) {
        return $resource('api/_search/blogs/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
