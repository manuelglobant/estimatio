'use strict';

var module = angular.module('userStoriesController', []);

module.controller('userStoriesController', function($scope, userStoriesFactory) {
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