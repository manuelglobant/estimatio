'use strict';

var module = angular.module('userStoriesController', []);

module.controller('userStoriesController', function ($scope, userStoriesFactory, estimationFactory) {
  var columnDefs = [
    {headerName: 'Owner', field: 'owner'},
    {headerName: '#', field: 'number', editable: true, newValueHandler: updateRow },
    {headerName: 'Name', field: 'name', editable: true, newValueHandler: updateRow},
    {headerName: 'Release', field: 'release', editable: true, newValueHandler: updateRow},
    {headerName: 'Details', field: 'details', editable: true, newValueHandler: updateRow},
    {headerName: 'Type (Epic, User Story, Technical Story)', field: 'type', editable: true, newValueHandler: updateRow},
    {headerName: '', template: '<button ng-click="remove(data)" ng-disabled="data.emptyRow" name="submit">Delete</button>', editable: false},
  ];

  $scope.remove = function (userStory) {
    userStoriesFactory.remove(userStory);    
    $scope.gridOptions.rowData = userStoriesFactory.get();
    $scope.gridOptions.api.onNewRows();
  };

  $scope.gridOptions = {
    angularCompileRows: true,
    columnDefs: columnDefs,
    rowData: userStoriesFactory.get(),
    enableColResize: true,
    ready: function (api) {
      api.sizeColumnsToFit();
      checkEmptyRows();
      api.onNewRows();
    }
  };

  $scope.userStory = {};

  $scope.save = function (userStory) {
    userStoriesFactory.add(userStory);
    $scope.gridOptions.api.onNewRows();  
    $scope.userStory = {};
  };

  function updateRow (row) {
    if (row.data.emptyRow && row.newValue !== '') {
      addEmptyRow();
    }

    row.data.emptyRow = false;
    if (row.newValue) row.data[row.colDef.field] = row.newValue;
    $scope.gridOptions.api.onNewRows();
  }

  function checkEmptyRows () {
    var emptyRows = $scope.gridOptions.rowData.filter(function (x){
      return x.emptyRow;
    });

    if (emptyRows.length === 0) addEmptyRow();
  }

  function addEmptyRow () {
    userStoriesFactory.add({
      emptyRow : true, 
      owner: estimationFactory.get().technicalEstimators, 
      number: '', 
      name: '', 
      release: '',
      details: '',
      type: ''
    });
  }
});