'use strict';

angular.module('blogApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('entry-management', {
                parent: 'entity',
                url: '/entry-management',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'blogApp.entryManagement.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/entry/entry-management.html',
                        controller: 'EntryManagementController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('entry');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('entry-management-detail', {
                parent: 'entity',
                url: '/entry-management/{id:int}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'blogApp.entryManagement.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/entry/entry-management-detail.html',
                        controller: 'EntryManagementDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('entry');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Entry', function($stateParams, Entry) {
                        return Entry.get({id : $stateParams.id});
                    }]
                }
            })
            .state('entry-management.new', {
                parent: 'entry-management',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/entry/entry-management-dialog.html',
                        controller: 'EntryManagementDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    title: null,
                                    content: null,
                                    date: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('entry-management', null, { reload: true });
                    }, function() {
                        $state.go('entry-management');
                    })
                }]
            })
            .state('entry-management.edit', {
                parent: 'entry-management',
                url: '/{id:int}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/entry/entry-management-dialog.html',
                        controller: 'EntryManagementDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Entry', function(Entry) {
                                return Entry.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('entry-management', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('entry-management.delete', {
                parent: 'entry-management',
                url: '/{id:int}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/entry/entry-management-delete-dialog.html',
                        controller: 'EntryManagementDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Entry', function(Entry) {
                                return Entry.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('entry-management', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
