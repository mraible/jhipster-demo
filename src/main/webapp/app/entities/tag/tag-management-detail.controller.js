'use strict';

angular.module('blogApp')
    .controller('TagManagementDetailController', function ($scope, $rootScope, $stateParams, entity, Tag, Entry) {
        $scope.tag = entity;
        $scope.load = function (id) {
            Tag.get({id: id}, function(result) {
                $scope.tag = result;
            });
        };
        var unsubscribe = $rootScope.$on('blogApp:tagUpdate', function(event, result) {
            $scope.tag = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
