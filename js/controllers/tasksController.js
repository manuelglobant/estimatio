'use strict';

var module = angular.module('tasksController', []);

module.controller('tasksController', function($scope, userStoriesFactory, tasksFactory, profilesFactory) {
  $scope.userStories = userStoriesFactory.get();
  $scope.profiles = profilesFactory.available();

  $scope.task = {};
  $scope.profile = {};

  $scope.columnDefs = [
    {headerName: '#', field: 'usNumber'},
    {headerName: 'Name', field: 'name', editable: true},
    {headerName: 'Release', field: 'usRelease'},
    {headerName: 'Assumptions', field: 'assumptions', editable: true}
  ];

  $scope.gridOptions = {
    columnDefs: $scope.columnDefs,
    rowData: tasksFactory.get(),
    enableColResize: true,
    ready: function(api) {
      api.sizeColumnsToFit();
      updateColumns(profilesFactory.selected());
    }
  };

  function updateGrid (newValue) {
    var updatedTask = newValue.data;
    var updatedField = newValue.colDef.field;
    updatedTask[updatedField] = newValue.newValue;
    tasksFactory.update(updatedTask);
    newValue.api.onNewRows();
  }

  function updateColumns (profiles) {
    profiles.forEach(function (profile) {      
      profile.columns.forEach(function (column) {
        if (column.newValueHandler === null) column.newValueHandler = updateGrid;
        if ($scope.columnDefs.every(function(x) { return column.field !== x.field;})) {
          $scope.columnDefs.push(column);
        }
      });
      $scope.gridOptions.api.onNewCols();
      $scope.gridOptions.api.sizeColumnsToFit();
    });
  }

  $scope.saveProfile = function(profile) {
    profile = JSON.parse(profile);
    profilesFactory.select(profile);
    $scope.profiles = profilesFactory.available();
    updateColumns(profilesFactory.selected());
  };

  $scope.saveTask = function(task) {
    tasksFactory.add(task);
    $scope.gridOptions.api.onNewRows();
    $scope.task = {};
  };
});
