'use strict';

var module = angular.module('columnsFactory', []);

module.factory('columnsFactory', function() {

  var calculateColumns = function (profile) {
    var result = [];

    // name: 'Project Manager',
    //   hasUnitTesting: false,
    //   hasIssueFixing: false,
    //   hasManualTesting: false,
    //   unitTestingModifier: 0,
    //   issueFixingModifier: 0

    var firstColumn = {
      headerName: profile.name,
      field: profile.name.split(' ').join(''),
      editable: true,
      newValueHandler: null
    };
    result.push(firstColumn);

    // if()
    // result.push()


    // {headerName: 'Frontend (SSr)', field: 'frontend', editable: true, newValueHandler: updateGrid},
    //  {headerName: 'Unit Testing Front (SSr)', field: 'unitTestingFront'},
    //  {headerName: 'Issue Fixing Front (SSr)', field: 'issueFixingFront'},
    // // {headerName: 'Manual Testing Front + Back (SSr)', field: 'manualTestingAll'},

    return result;
  };

  return {
    calculate: calculateColumns
  };
});