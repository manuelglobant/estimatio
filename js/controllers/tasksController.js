'use strict';

var module = angular.module('tasksController', []);

module.controller('tasksController', function ($scope, userStoriesFactory, tasksFactory, profilesFactory, columnsFactory) {
  $scope.userStories = userStoriesFactory.get();
  $scope.profiles = profilesFactory.get();

  $scope.task = {};

  $scope.columnDefs = [
    {headerName: '#', field: 'usNumber'},
    {headerName: 'Name', field: 'name', editable: true},
    {headerName: 'Release', field: 'usRelease'},
    {headerName: 'Assumptions', field: 'assumptions', editable: true}
  ];

  $scope.columnDefs.push(columnsFactory.total());

  $scope.gridOptions = {
    angularCompileRows: true,
    columnDefs: $scope.columnDefs,
    rowData: tasksFactory.get(),
    groupHeaders: true,
    enableColResize: true,
    ready: function(api) {
      api.sizeColumnsToFit();
      updateColumns(profilesFactory.get());
      checkEmptyRows();
      api.onNewRows();
      updateTotal();
      api.refreshView();
    }
  };

  $scope.saveTask = function(task, data) {
    tasksFactory.get()[tasksFactory.get().indexOf(data)] = tasksFactory.add(task);
    $scope.task = {};
    addEmptyRow();
  };

  function updateTotal () {
    tasksFactory.get().forEach(function (x) {
      if (x.profiles) {
        x.profiles.forEach(function (profile) {
          if (profile.columns.length > 1) {
            profile.columns[profile.columns.length - 1].valueGetter(x.data);
          } else {
            x.total[profile.name.toLowerCase()] = x[profile.name.toLowerCase()];
          }
        });
      }
    });
  }
  
  function updateRow (newValue) {
    var updatedTask = newValue.data;
    var updatedField = newValue.colDef.field;

    updatedTask[updatedField] = newValue.newValue;
    updatedTask.total[updatedField] = newValue.newValue;

    if (!updatedTask.profiles) {
      updatedTask.profiles = [];
    }

    updatedTask.profiles.push(this.profile);

    if (!updatedTask.data) updatedTask.data = newValue;

    updatedTask.profiles.forEach(function(profile) {
      if (profile.columns.length > 1) {
        profile.columns[profile.columns.length - 1].valueGetter(newValue);
      }
    });

    tasksFactory.update(updatedTask);
    newValue.api.refreshView();
  }

  function checkEmptyRows () {
    var emptyRows = $scope.gridOptions.rowData.filter(function (x){
     return x.emptyRow;
    });

    if (emptyRows.length === 0) addEmptyRow();
  }

  function addEmptyRow () {
    $scope.gridOptions.rowData.push({
      emptyRow: true, 
      usNumber: '<task-selector></task-selector>', 
      name: '', release: '', 
      assumptions: ''
    });

    $scope.gridOptions.api.onNewRows();
  }

  function updateColumns (profiles) {
    profiles.forEach(function (profile) {      
      profile.columns.forEach(function (column) {
        if (column.newValueHandler === null) {
          column.newValueHandler = updateRow;
        }

        $scope.columnDefs.push(column);
      });
    });
    
    reorderColumns();
  }

  function reorderColumns () {
    var grid = $scope.gridOptions;

    var totalCol = grid.columnDefs.filter(function (x) { 
      return x.field === 'total'; 
    })[0];
    
    grid.columnDefs = grid.columnDefs.filter(function (x) {
      return x.field !== 'total'; 
    });
    
    grid.columnDefs.push(totalCol);
    
    grid.api.onNewCols();
    grid.api.sizeColumnsToFit();
  }
});
