'use strict';
var module = angular.module('estimation', ['angularGrid', 'userStoriesFactory']);

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

module.factory('tasksFactory', function(modifiers) {
  var tasks = [];
  var __taskId = 1;

  var add = function (task) {
    task.id = __taskId;
    task.userStory = JSON.parse(task.userStory);
    task.usNumber = task.userStory.number;
    task.usName = task.userStory.name;
    task.usRelease = task.userStory.release;
    task.unitTestingFront = Math.ceil((modifiers.unitTestingFront * task.frontend) / 100);
    task.unitTestingBack = Math.ceil((modifiers.unitTestingBack * task.backend) / 100);
    task.issueFixingFront = Math.ceil((modifiers.issueFixingFront * task.frontend) / 100); 
    task.issueFixingBack = Math.ceil((modifiers.issueFixingBack * task.backend) / 100);

    tasks.push(task);
    __taskId++;
  };

  var update = function (newValue) {
    var task = tasks.filter(function(x){return x.id === newValue.id;})[0];
    newValue.unitTestingFront = Math.ceil((modifiers.unitTestingFront * newValue.frontend) / 100);
    newValue.unitTestingBack = Math.ceil((modifiers.unitTestingBack * newValue.backend) / 100);
    newValue.issueFixingFront = Math.ceil((modifiers.issueFixingFront * newValue.frontend) / 100); 
    newValue.issueFixingBack = Math.ceil((modifiers.issueFixingBack * newValue.backend) / 100);
    tasks[tasks.indexOf(task)] = newValue;
  };

  var get = function () {
    return tasks;
  };

  return {
    get: get,
    add: add,
    update: update
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