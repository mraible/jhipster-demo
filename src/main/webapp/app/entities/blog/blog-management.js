'use strict';

angular.module('blogApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('blog-management', {
                parent: 'entity',
                url: '/blog-management',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'blogApp.blogManagement.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/blog/blog-management.html',
                        controller: 'BlogManagementController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('blog');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('blog-management-detail', {
                parent: 'entity',
                url: '/blog-management/{id:int}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'blogApp.blogManagement.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/blog/blog-management-detail.html',
                        controller: 'BlogManagementDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('blog');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Blog', function($stateParams, Blog) {
                        return Blog.get({id : $stateParams.id});
                    }]
                }
            })
            .state('blog-management.new', {
                parent: 'blog-management',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/blog/blog-management-dialog.html',
                        controller: 'BlogManagementDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    handle: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('blog-management', null, { reload: true });
                    }, function() {
                        $state.go('blog-management');
                    })
                }]
            })
            .state('blog-management.edit', {
                parent: 'blog-management',
                url: '/{id:int}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/blog/blog-management-dialog.html',
                        controller: 'BlogManagementDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Blog', function(Blog) {
                                return Blog.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('blog-management', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('blog-management.delete', {
                parent: 'blog-management',
                url: '/{id:int}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/blog/blog-management-delete-dialog.html',
                        controller: 'BlogManagementDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Blog', function(Blog) {
                                return Blog.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('blog-management', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
