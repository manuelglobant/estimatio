'use strict';

var module = angular.module('profilesController', []);

module.controller('profilesController', function ($scope, profilesFactory) {
  $scope.profile = '';
  var originalProfileData;

  var columnDefs = [
    {headerName: 'Name', field: 'name', editable: true},
    {headerName: 'Unit Testing', template: '<input type="checkbox" name="hasUnitTesting" ng-model="data.hasUnitTesting" ng-click="checkDifference(data)"/>', editable: false},
    {headerName: 'Unit Testing Modifier', field: 'unitTestingModifier', editable: enabledUnitTestingModifier, newValueHandler: checkDifference},
    {headerName: 'Issue Fixing', template: '<input type="checkbox" name="hasIssueFixing" ng-model="data.hasIssueFixing" ng-click="checkDifference(data)"/>', editable: false},
    {headerName: 'Issue Fixing Modifier', field: 'issueFixingModifier', editable: enabledIssueFixingModifier, newValueHandler: checkDifference},
    {headerName: 'Manual Testing', template: '<input type="checkbox" name="hasManualTesting" ng-model="data.hasManualTesting" ng-click="checkDifference(data)"/>', editable: false},
    {headerName: '', template: '<button ng-disabled="!data.changed" ng-click="update(data)" name="submit">Update</button>', editable: false},
  ];

  $scope.checkDifference = checkDifference;

  $scope.add = function (profile) {
    profilesFactory.add(profile);
    $scope.gridOptions.api.onNewRows();
    $scope.profile = '';
  };

  $scope.update = function (profile) {
    profilesFactory.update(profile);
    originalProfileData[originalProfileData.indexOf(profile)] = profile;
    profile.changed = false;
  };

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

  function enabledUnitTestingModifier (data) {
    return data.hasUnitTesting;
  }

  function enabledIssueFixingModifier (data) {
    return data.hasIssueFixing;
  }

  function cloneRowData () {
    originalProfileData = _.map($scope.gridOptions.rowData, _.clone);
  }

  function checkDifference (newValue) {
    var profile = (newValue.data) ? newValue.data : newValue;

    var originalProfile = _.find(originalProfileData, function(x) {
      return x.name === profile.name;
    });

    if (newValue.data) profile[newValue.colDef.field] = parseInt(newValue.newValue);

    compareProfiles(originalProfile, profile);
  }

  function compareProfiles (originalProfile, profile) {
    var comparison = {
      original: _.clone(originalProfile),
      updated: _.clone(profile)
    };

    delete comparison.original.changed;
    delete comparison.updated.changed;
    
    if (!_.isEqual(comparison.original, comparison.updated)) {
      profile.changed = true;
    } else {
      profile.changed = false;
    }
  }  
});
