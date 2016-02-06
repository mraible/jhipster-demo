'use strict';

angular.module('blogApp')
    .controller('BlogManagementController', function ($scope, $state, Blog, BlogSearch) {

        $scope.blogs = [];
        $scope.loadAll = function() {
            Blog.query(function(result) {
               $scope.blogs = result;
            });
        };
        $scope.search = function () {
            BlogSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.blogs = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };
        $scope.loadAll();    
    });
