'use strict';

angular.module('blogApp')
    .controller('EntryManagementDetailController', function ($scope, $rootScope, $stateParams, DataUtils, entity, Entry, Blog, Tag) {
        $scope.entry = entity;
        $scope.load = function (id) {
            Entry.get({id: id}, function(result) {
                $scope.entry = result;
            });
        };
        var unsubscribe = $rootScope.$on('blogApp:entryUpdate', function(event, result) {
            $scope.entry = result;
        });
        $scope.$on('$destroy', unsubscribe);

        $scope.byteSize = DataUtils.byteSize;
    });
