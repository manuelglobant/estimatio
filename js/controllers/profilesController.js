'use strict';

var module = angular.module('profilesController', []);

module.controller('profilesController', function($scope, profilesFactory) {
  $scope.profile = '';

  var columnDefs = [
    {headerName: 'Name', field: 'name', editable: true},
    {headerName: 'Unit Testing', template: '<input type="checkbox" name="hasUnitTesting" ng-model="data.hasUnitTesting" ng-click="checkLastSubmited(data)"/>', editable: false},
    {headerName: 'Unit Testing Modifier', field: 'unitTestingModifier', editable: enabledUnitTestingModifier, newValueHandler: checkLastSubmited},
    {headerName: 'Issue Fixing', template: '<input type="checkbox" name="hasIssueFixing" ng-model="data.hasIssueFixing" ng-click="checkLastSubmited(data)"/>', editable: false},
    {headerName: 'Issue Fixing Modifier', field: 'issueFixingModifier', editable: enabledIssueFixingModifier, newValueHandler: checkLastSubmited},
    {headerName: 'Manual Testing', template: '<input type="checkbox" name="hasManualTesting" ng-model="data.hasManualTesting" ng-click="checkLastSubmited(data)"/>', editable: false},
    {headerName: '', template: '<button ng-disabled="!data.changed" ng-click="update(data)" name="submit">Update</button>', editable: false},
  ];

  function enabledUnitTestingModifier(data) {
    return data.hasUnitTesting;
  }

  function enabledIssueFixingModifier(data) {
    return data.hasIssueFixing;
  }

  function checkLastSubmited (newValue) {
    var profile = (newValue.data) ? newValue.data : newValue;
    
    // var oldProfile = profile.lastSubmited;
    // var newProfile = _.clone(profile);
    // delete newProfile.lastSubmited;
    // if (!_.isEqual(oldProfile, newProfile)) {
    //   profile.changed = true;
    // } else {
    //   profile.changed = false;
    // }
    if (parseInt(newValue.newValue) !== newValue.oldValue) {
      profile.changed = true;
    }

    if (newValue.data) profile[newValue.colDef.field] = parseInt(newValue.newValue);
  }

  $scope.checkLastSubmited = checkLastSubmited;

  $scope.add = function (profile) {
    profilesFactory.add(profile);
    $scope.gridOptions.api.onNewRows();
    $scope.profile = '';
  };

  $scope.update = function (profile) {
    profilesFactory.update(profile);
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
