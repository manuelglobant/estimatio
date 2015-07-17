'use strict';

var module = angular.module('estimationFactory', []);

module.factory('estimationFactory', function () {
  var estimation = {};

  var save = function (newEstimation) {
    debugger;
    estimation = newEstimation;
  };

  var get = function () {
    return estimation;
  };

  return {
    get: get,
    save: save
  };
});