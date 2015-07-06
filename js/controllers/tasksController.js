'use strict';

var module = angular.module('tasksController', []);

module.controller('tasksController', function($scope, userStoriesFactory, tasksFactory, profilesFactory) {
  $scope.userStories = userStoriesFactory.get();
  $scope.profiles = profilesFactory.available();

  $scope.task = {};
  $scope.profile = {};

  var columnDefs = [
    {headerName: '#', field: 'usNumber'},
    {headerName: 'Name', field: 'name', editable: true},
    {headerName: 'Release', field: 'usRelease'},
    {headerName: 'Assumptions', field: 'assumptions', editable: true},
    // {headerName: 'Frontend (SSr)', field: 'frontend', editable: true, newValueHandler: updateGrid},
    // {headerName: 'Backend (SSr)', field: 'backend', editable: true, newValueHandler: updateGrid},
    // {headerName: 'Design and Architecture', field: 'architecture', editable: true},
    // {headerName: 'Visual Designer', field: 'visual', editable: true},
    // {headerName: 'Unit Testing Front (SSr)', field: 'unitTestingFront'},
    // {headerName: 'Unit Testing Back (SSr)', field: 'unitTestingBack'},
    // {headerName: 'Issue Fixing Front (SSr)', field: 'issueFixingFront'},
    // {headerName: 'Issue Fixing Back (SSr)', field: 'issueFixingBack'},
    // {headerName: 'Manual Testing Front + Back (SSr)', field: 'manualTestingAll'},
    // {headerName: 'Frontend (SSr)', field: 'totalFront'},
    // {headerName: 'Backend (SSr)', field: 'totalBack'}
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

  $scope.saveProfile = function(profile) {
    profile = JSON.parse(profile);
    profilesFactory.select(profile);
    $scope.profiles = profilesFactory.available();
  };

  $scope.saveTask = function(task) {
    tasksFactory.add(task);
    $scope.gridOptions.api.onNewRows();
    $scope.task = {};
  };
});
