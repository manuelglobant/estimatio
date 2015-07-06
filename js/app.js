'use strict';
var module = angular.module('estimation', [
  'angularGrid', 
  'userStoriesFactory',
  'userStoriesController',
  'tasksFactory', 
  'tasksController',
  'estimationFactory',
  'estimationController'
]);

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