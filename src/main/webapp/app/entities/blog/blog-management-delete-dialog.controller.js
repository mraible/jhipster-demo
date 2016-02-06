'use strict';

angular.module('blogApp')
	.controller('BlogManagementDeleteController', function($scope, $uibModalInstance, entity, Blog) {

        $scope.blog = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Blog.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
