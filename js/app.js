'use strict';
var module = angular.module('estimation', [
  'ui.router',
  'angularGrid', 
  'userStoriesFactory',
  'userStoriesController',
  'tasksFactory', 
  'tasksController',
  'estimationFactory',
  'estimationController',
  'profilesController',
  'profilesFactory',
  'columnsFactory'
]);

module.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('estimation', {
      url: '/estimation',
      templateUrl: 'partials/estimation.html'
    })
    .state('stories', {
      url: '/stories',
      templateUrl: 'partials/stories.html'
    })
    .state('profiles', {
      url: '/profiles',
      templateUrl: 'partials/profiles.html'
    })
    .state('tasks', {
      url: '/tasks',
      templateUrl: 'partials/tasks.html'
    });
});

module.service('modifiers', function() {
  return {
    default: 10,
    unitTestingFront: 35,
    unitTestingBack: 35,
    issueFixingFront: 20,
    issueFixingBack: 20,
    manualTesting: 40
  };
});