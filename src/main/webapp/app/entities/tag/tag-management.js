'use strict';

angular.module('blogApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('tag-management', {
                parent: 'entity',
                url: '/tag-management',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'blogApp.tagManagement.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/tag/tag-management.html',
                        controller: 'TagManagementController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('tag');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('tag-management-detail', {
                parent: 'entity',
                url: '/tag-management/{id:int}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'blogApp.tagManagement.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/tag/tag-management-detail.html',
                        controller: 'TagManagementDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('tag');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Tag', function($stateParams, Tag) {
                        return Tag.get({id : $stateParams.id});
                    }]
                }
            })
            .state('tag-management.new', {
                parent: 'tag-management',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/tag/tag-management-dialog.html',
                        controller: 'TagManagementDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('tag-management', null, { reload: true });
                    }, function() {
                        $state.go('tag-management');
                    })
                }]
            })
            .state('tag-management.edit', {
                parent: 'tag-management',
                url: '/{id:int}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/tag/tag-management-dialog.html',
                        controller: 'TagManagementDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Tag', function(Tag) {
                                return Tag.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('tag-management', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('tag-management.delete', {
                parent: 'tag-management',
                url: '/{id:int}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/tag/tag-management-delete-dialog.html',
                        controller: 'TagManagementDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Tag', function(Tag) {
                                return Tag.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('tag-management', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
