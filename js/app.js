/* global angular */
'use strict';
var module = angular.module('estimation', ['angularGrid']);

module.controller('estimationCtrl', function($scope) {
  $scope.estimation = {};
});

module.factory('userStoriesFactory', function() {
  var userStories = [
    {owner: 'Estimator 1', number: 'US-01', name: 'User Store 1', release: '1', details: 'As a user, I want to...', type: 'User Story'}
  ];

  var add = function (userStory) {
    userStories.push(userStory);
  };

  return {
    userStories: userStories,
    add: add
  };
});

module.controller('userStoriesCtrl', function($scope, userStoriesFactory) {
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
    rowData: userStoriesFactory.userStories,
    dontUseScrolls: true // because so little data, no need to use scroll bars
  };

  $scope.userStory = {};

  $scope.save = function(userStory) {
    userStoriesFactory.add(userStory);
    $scope.gridOptions.api.onNewRows();
    $scope.userStory = {};
  };
});