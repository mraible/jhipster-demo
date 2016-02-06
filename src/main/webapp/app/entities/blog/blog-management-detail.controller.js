'use strict';

angular.module('blogApp')
    .controller('BlogManagementDetailController', function ($scope, $rootScope, $stateParams, entity, Blog, User, Entry) {
        $scope.blog = entity;
        $scope.load = function (id) {
            Blog.get({id: id}, function(result) {
                $scope.blog = result;
            });
        };
        var unsubscribe = $rootScope.$on('blogApp:blogUpdate', function(event, result) {
            $scope.blog = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
