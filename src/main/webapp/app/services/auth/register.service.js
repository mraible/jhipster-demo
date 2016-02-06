'use strict';

angular.module('blogApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


