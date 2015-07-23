'use strict';

var module = angular.module('taskSelector', []);
 
module.directive('taskSelector', function($timeout) {
  return {
    restrict: 'AE',
    replace: true,
    scope: {},
    link: function() {},
    templateUrl: 'partials/taskSelector.html'
  };
});