'use strict';

var module = angular.module('profilesController', []);

module.controller('profilesController', function($scope, profilesFactory) {
  $scope.profile = '';

  var columnDefs = [
    {headerName: 'Name', field: 'name', editable: true},
    {headerName: 'Unit Testing', template: '<input type="checkbox" name="hasUnitTesting" ng-model="data.hasUnitTesting"/>', editable: true},
    {headerName: 'Unit Testing Modifier', field: 'unitTestingModifier', editable: true},
    {headerName: 'Issue Fixing', template: '<input type="checkbox" name="hasIssueFixing" ng-model="data.hasIssueFixing"/>', editable: true},
    {headerName: 'Issue Fixing Modifier', field: 'issueFixingModifier', editable: true},
    {headerName: 'Manual Testing', template: '<input type="checkbox" name="hasManualTesting" ng-model="data.hasManualTesting"/>', editable: true},
  ];

  $scope.add = function (profile) {
    profilesFactory.add(profile);
    $scope.gridOptions.api.onNewRows();
    $scope.profile = '';
  };

  $scope.gridOptions = {
    angularCompileRows: true,
    columnDefs: columnDefs,
    rowData: profilesFactory.get(),
    enableColResize: true,
    ready: function(api) {
      api.sizeColumnsToFit();
    }
  };
});
