'use strict';

var module = angular.module('tasksController', []);

module.controller('tasksController', function($scope, userStoriesFactory, tasksFactory) {
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