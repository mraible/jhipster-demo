'use strict';

angular.module('blogApp')
    .factory('EntrySearch', function ($resource) {
        return $resource('api/_search/entries/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
