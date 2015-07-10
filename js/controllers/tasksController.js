'use strict';

var module = angular.module('tasksController', []);

module.controller('tasksController', function($scope, userStoriesFactory, tasksFactory, profilesFactory) {
  $scope.userStories = userStoriesFactory.get();
  $scope.profiles = profilesFactory.get();

  $scope.task = {};
  $scope.profile = {};

  $scope.columnDefs = [
    {headerName: '#', field: 'usNumber'},
    {headerName: 'Name', field: 'name', editable: true},
    {headerName: 'Release', field: 'usRelease'},
    {headerName: 'Assumptions', field: 'assumptions', editable: true}
  ];

  $scope.gridOptions = {
    angularCompileRows: true,
    columnDefs: $scope.columnDefs,
    rowData: tasksFactory.get(),
    enableColResize: true,
    ready: function(api) {
      api.sizeColumnsToFit();
      updateColumns(profilesFactory.get());
      addEmptyRow();
      api.onNewRows();
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

  function addEmptyRow () {
    $scope.gridOptions.rowData.push({emptyRow: true, usNumber: taskSelector, name: '', release: '', assumptions: ''});
  }

  var taskSelector = 
    '<select ng-model="task.userStory" ng-change="saveTask(task, data)">' +
      '<option ng-selected="{{userStory.number == task.userStory.number}}" ng-repeat="userStory in userStories" value="{{userStory}}">{{userStory.number}}</option>' +
    '</select>';

  $scope.saveTask = function(task, data) {
    tasksFactory.get()[tasksFactory.get().indexOf(data)] = tasksFactory.transform(task);
    $scope.task = {};
    addEmptyRow();
    $scope.gridOptions.api.onNewRows();
  };
});
