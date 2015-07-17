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
    enableColResize: true,
    ready: function(api) {
      api.sizeColumnsToFit();
      updateColumns(profilesFactory.get());
      checkEmptyRows();
      api.onNewRows();
    }
  };

  $scope.saveTask = function(task, data) {
    tasksFactory.get()[tasksFactory.get().indexOf(data)] = tasksFactory.add(task);
    $scope.task = {};
    addEmptyRow();
    $scope.gridOptions.api.onNewRows();
  };

  function updateColumns (profiles) {
    profiles.forEach(function (profile) {      
      profile.columns.forEach(function (column) {
        if (column.newValueHandler === null) column.newValueHandler = updateRow;

        if ($scope.columnDefs.every(function (x) { return column.field !== x.field; })) {
          $scope.columnDefs.push(column);
        }
      });
    });
    
    reorderColumns();
  }

  function reorderColumns () {
    var manualTestingCol = $scope.gridOptions.columnDefs.filter(function (x) { 
      return x.field === 'manualfixing'; 
    })[0];

    var totalCol = $scope.gridOptions.columnDefs.filter(function (x) { 
      return x.field === 'total'; 
    })[0];
    
    if (manualTestingCol) {
      $scope.gridOptions.columnDefs = $scope.gridOptions.columnDefs.filter(function (x) {
        return x.field !== 'manualfixing'; 
      });
      
      $scope.gridOptions.columnDefs.push(manualTestingCol);
    }

    $scope.gridOptions.columnDefs = $scope.gridOptions.columnDefs.filter(function (x) {
      return x.field !== 'total'; 
    });

    $scope.gridOptions.columnDefs.push(totalCol);

    $scope.gridOptions.api.onNewCols();
    $scope.gridOptions.api.sizeColumnsToFit();
  }

  function updateRow (newValue) {
    var updatedTask = newValue.data;
    var updatedField = newValue.colDef.field;
    updatedTask[updatedField] = newValue.newValue;
    updatedTask.total[updatedField] = newValue.newValue;
    tasksFactory.update(updatedTask);
    newValue.api.onNewRows();
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
  }
});
