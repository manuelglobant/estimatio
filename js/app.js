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
  'profilesFactory'
]);

module.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/estimation');
  $stateProvider
    .state('estimation', {
      url: '/estimation',
      templateUrl: 'partials/estimation.html'
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