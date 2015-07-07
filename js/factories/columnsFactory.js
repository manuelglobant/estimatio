'use strict';

var module = angular.module('columnsFactory', []);

module.factory('columnsFactory', function() {

  var calculateColumns = function (profile) {
    var result = [];

    var firstColumn = {
      headerName: profile.name,
      field: profile.name.split(' ').join('').toLowerCase().replace(/[{()}]/g, ''),
      editable: true,
      newValueHandler: null
    };

    result.push(firstColumn);

    if (profile.hasUnitTesting) {
      var secondColumn = {
        headerName: profile.name + ' Unit Testing',
        field: profile.name.split(' ').join('').toLowerCase().replace(/[{()}]/g, '') + 'unittesting',
        editable: true
      };
      result.push(secondColumn);
    }
    
    if (profile.hasIssueFixing) {
      var thirdColumn = {
        headerName: profile.name + ' Issue Fixing',
        field: profile.name.split(' ').join('').toLowerCase().replace(/[{()}]/g, '') + 'issuefixing',
        editable: true
      };
      result.push(thirdColumn);
    }

    if (profile.hasManualTesting) {
      var forthColumn = {
        headerName: 'Manual Testing',
        field: 'manualfixing',
        editable: true
      };
      result.push(forthColumn);
    }

    return result;
  };

  return {
    calculate: calculateColumns
  };
});