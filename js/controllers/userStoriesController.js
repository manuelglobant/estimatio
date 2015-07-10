'use strict';

var module = angular.module('userStoriesController', []);

module.controller('userStoriesController', function($scope, userStoriesFactory) {
  var columnDefs = [
    {headerName: 'Owner', field: 'owner'},
    {headerName: '#', field: 'number', editable: true, newValueHandler: checkEmptyRow },
    {headerName: 'Name', field: 'name', editable: true},
    {headerName: 'Release', field: 'release', editable: true},
    {headerName: 'Details', field: 'details', editable: true},
    {headerName: 'Type (Epic, User Story, Technical Story)', field: 'type', editable: true},
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

  function addEmptyRow () {
    $scope.gridOptions.rowData.push({emptyRow : true, owner: '', number: '', name: '', release: '', details: '', type: ''});
  }

  $scope.remove = function (userStory) {
    $scope.gridOptions.rowData = userStoriesFactory.remove(userStory);    
    $scope.gridOptions.api.onNewRows();
  };

  $scope.gridOptions = {
    angularCompileRows: true,
    columnDefs: columnDefs,
    rowData: userStoriesFactory.get(),
    enableColResize: true,
    ready: function(api) {
      api.sizeColumnsToFit();
      addEmptyRow();
      api.onNewRows();
    }
  };

  $scope.userStory = {};

  $scope.save = function(userStory) {
    userStoriesFactory.add(userStory);
    $scope.gridOptions.api.onNewRows();  
    $scope.userStory = {};
  };
});