'use strict';

var module = angular.module('userStoriesController', []);

module.controller('userStoriesController', function ($scope, userStoriesFactory) {
  var columnDefs = [
    {headerName: 'Owner', field: 'owner'},
    {headerName: '#', field: 'number', editable: true, newValueHandler: checkEmptyRow },
    {headerName: 'Name', field: 'name', editable: true, newValueHandler: checkEmptyRow},
    {headerName: 'Release', field: 'release', editable: true, newValueHandler: checkEmptyRow},
    {headerName: 'Details', field: 'details', editable: true, newValueHandler: checkEmptyRow},
    {headerName: 'Type (Epic, User Story, Technical Story)', field: 'type', editable: true, newValueHandler: checkEmptyRow},
    {headerName: '', template: '<button ng-click="remove(data)" ng-disabled="data.emptyRow" name="submit">Delete</button>', editable: false},
  ];

  function checkEmptyRow (newValue) {
    if (newValue.data.emptyRow && newValue.newValue !== '') {
      addEmptyRow();
    }
    
    newValue.data.emptyRow = false;
    newValue.data[newValue.colDef.field] = newValue.newValue;
    $scope.gridOptions.api.onNewRows();
  }

  function checkEmptyRows () {
    var emptyRows = $scope.gridOptions.rowData.filter(function (x){
      return x.emptyRow;
    });

    if (emptyRows.length === 0) addEmptyRow();
  }

  function addEmptyRow () {
    userStoriesFactory.add({emptyRow : true, owner: '', number: '', name: '', release: '', details: '', type: ''});
  }

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
});