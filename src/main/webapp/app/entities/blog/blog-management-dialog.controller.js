'use strict';

angular.module('blogApp').controller('BlogManagementDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Blog', 'User', 'Entry',
        function($scope, $stateParams, $uibModalInstance, entity, Blog, User, Entry) {

        $scope.blog = entity;
        $scope.users = User.query();
        $scope.entrys = Entry.query();
        $scope.load = function(id) {
            Blog.get({id : id}, function(result) {
                $scope.blog = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('blogApp:blogUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.blog.id != null) {
                Blog.update($scope.blog, onSaveSuccess, onSaveError);
            } else {
                Blog.save($scope.blog, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
