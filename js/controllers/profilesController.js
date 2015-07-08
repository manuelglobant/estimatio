'use strict';

var module = angular.module('profilesController', []);

module.controller('profilesController', function($scope, profilesFactory) {
  $scope.profile = '';

  var columnDefs = [
    {headerName: 'Name', field: 'name', editable: true},
    {headerName: 'Unit Testing', template: '<input type="checkbox" name="hasUnitTesting" ng-model="data.hasUnitTesting" ng-click="checkDifference(data)"/>', editable: false},
    {headerName: 'Unit Testing Modifier', field: 'unitTestingModifier', editable: enabledUnitTestingModifier, newValueHandler: checkDifference},
    {headerName: 'Issue Fixing', template: '<input type="checkbox" name="hasIssueFixing" ng-model="data.hasIssueFixing" ng-click="checkDifference(data)"/>', editable: false},
    {headerName: 'Issue Fixing Modifier', field: 'issueFixingModifier', editable: enabledIssueFixingModifier, newValueHandler: checkDifference},
    {headerName: 'Manual Testing', template: '<input type="checkbox" name="hasManualTesting" ng-model="data.hasManualTesting" ng-click="checkDifference(data)"/>', editable: false},
    {headerName: '', template: '<button ng-disabled="!data.changed" ng-click="update(data)" name="submit">Update</button>', editable: false},
  ];

  function enabledUnitTestingModifier(data) {
    return data.hasUnitTesting;
  }

  function enabledIssueFixingModifier(data) {
    return data.hasIssueFixing;
  }

  function checkDifference (newValue) {
    var profile = (newValue.data) ? newValue.data : newValue;
    
    if (parseInt(newValue.newValue) !== newValue.oldValue) {
      profile.changed = true;
    }

    if (newValue.data) profile[newValue.colDef.field] = parseInt(newValue.newValue);
  }

  $scope.checkDifference = checkDifference;

  $scope.add = function (profile) {
    profilesFactory.add(profile);
    $scope.gridOptions.api.onNewRows();
    $scope.profile = '';
  };

  $scope.update = function (profile) {
    profilesFactory.update(profile);
    $scope.originalGrid[$scope.originalGrid.indexOf(profile)] = profile;
  };

  function cloneRowData() {
    $scope.originalGrid = _.clone($scope.gridOptions.rowData);
  }
  
  $scope.gridOptions = {
    angularCompileRows: true,
    columnDefs: columnDefs,
    rowData: profilesFactory.get(),
    enableColResize: true,
    ready: function(api) {
      cloneRowData();
      api.sizeColumnsToFit();
    }
  };
});
