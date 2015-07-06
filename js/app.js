'use strict';
var module = angular.module('estimation', [
  'angularGrid', 
  'userStoriesFactory',
  'userStoriesController',
  'tasksFactory', 
  'tasksController',
  'estimationFactory'
]);

module.controller('estimationCtrl', function($scope, estimationFactory) {
  $scope.estimation = {};

  $scope.save = function(estimation){
    estimationFactory.save(estimation);
    $scope.estimation = {};
  };
});

module.service('modifiers', function() {
  return {
    default: 10,
    unitTestingFront: 35,
    unitTestingBack: 35,
    issueFixingFront: 20,
    issueFixingBack: 20,
    manuelTesting: 40
  };
});