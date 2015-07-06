'use strict';
var module = angular.module('estimation', ['angularGrid', 'userStoriesFactory', 'tasksFactory']);

module.factory('estimationFactory', function() {
  var estimation = {};

  var save = function (newEstimation) {
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

module.controller('estimationCtrl', function($scope, estimationFactory) {
  $scope.estimation = {};

  $scope.save = function(estimation){
    estimationFactory.save(estimation);
    $scope.estimation = {};
  };
});

module.controller('userStoriesCtrl', function($scope, userStoriesFactory) {
  var columnDefs = [
    {headerName: 'Owner', field: 'owner'},
    {headerName: '#', field: 'number'},
    {headerName: 'Name', field: 'name'},
    {headerName: 'Release', field: 'release'},
    {headerName: 'Details', field: 'details'},
    {headerName: 'Type (Epic, User Story, Technical Story)', field: 'type'}
  ];

  $scope.gridOptions = {
    columnDefs: columnDefs,
    rowData: userStoriesFactory.get(),
    enableColResize: true,
    ready: function(api) {
      api.sizeColumnsToFit();
    }
  };

  $scope.userStory = {};

  $scope.save = function(userStory) {
    userStoriesFactory.add(userStory);
    $scope.gridOptions.api.onNewRows();  
    $scope.userStory = {};
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

module.controller('tasksCtrl', function($scope, userStoriesFactory, tasksFactory) {
  $scope.userStories = userStoriesFactory.get();

  $scope.task = {};

  var columnDefs = [
    {headerName: '#', field: 'usNumber'},
    {headerName: 'Name', field: 'usName'},
    {headerName: 'Release', field: 'usRelease'},
    {headerName: 'Assumptions', field: 'assumptions', editable: true},
    {headerName: 'Frontend (SSr)', field: 'frontend', editable: true, newValueHandler: updateGrid},
    {headerName: 'Backend (SSr)', field: 'backend', editable: true, newValueHandler: updateGrid},
    {headerName: 'Design and Architecture', field: 'architecture', editable: true},
    {headerName: 'Visual Designer', field: 'visual', editable: true},
    {headerName: 'Unit Testing Front (SSr)', field: 'unitTestingFront', editable: true},
    {headerName: 'Unit Testing Back (SSr)', field: 'unitTestingBack', editable: true},
    {headerName: 'Issue Fixing Front (SSr)', field: 'issueFixingFront', editable: true},
    {headerName: 'Issue Fixing Back (SSr)', field: 'issueFixingBack', editable: true}
  ];

  $scope.gridOptions = {
    columnDefs: columnDefs,
    rowData: tasksFactory.get(),
    enableColResize: true,
    ready: function(api) {
      api.sizeColumnsToFit();
    }
  };

  function updateGrid (newValue) {
    var updatedTask = newValue.data;
    var updatedField = newValue.colDef.field;
    updatedTask[updatedField] = newValue.newValue;
    tasksFactory.update(updatedTask);
    newValue.api.onNewRows();
  }

  $scope.save = function(task) {
    tasksFactory.add(task);
    $scope.gridOptions.api.onNewRows();
    $scope.task = {};
  };
});