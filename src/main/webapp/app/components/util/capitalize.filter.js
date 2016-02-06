'use strict';

angular.module('blogApp')
    .filter('capitalize', function () {
        return function (input) {
            if (input !== null) {
                input = input.toLowerCase();
            }
            return input.substring(0, 1).toUpperCase() + input.substring(1);
        };
    });
