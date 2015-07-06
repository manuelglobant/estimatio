'use strict';

var module = angular.module('estimationController', []);

module.controller('estimationController', function($scope, estimationFactory) {
  $scope.estimation = {};

  $scope.save = function(estimation){
    estimationFactory.save(estimation);
    $scope.estimation = {};
  };
});