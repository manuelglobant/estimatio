'use strict';

var module = angular.module('columnsFactory', []);

module.factory('columnsFactory', function () {

  var build = function (profile) {
    var result = [];
    var field = profile.name
      .split(' ')
      .join('')
      .toLowerCase()
      .replace(/[{()}]/g, '');

    var firstColumn = {
      headerName: 'Hours',
      field: field,
      headerGroupShow: 'closed',
      headerGroup: profile.name,
      profile: profile,
      editable: true,
      newValueHandler: null
    };

    result.push(firstColumn);

    if (profile.hasUnitTesting) {
      var secondColumn = {
        headerName: 'Unit Testing',
        field: field + 'unittesting',
        headerGroupShow: 'open',
        headerGroup: profile.name,
        editable: true,
        valueGetter: function (params) {
          return params.data[field] * profile.unitTestingModifier / 100 || ''; 
        }
      };
    
      result.push(secondColumn);
    }
    
    if (profile.hasIssueFixing) {
      var thirdColumn = {
        headerName: 'Issue Fixing',
        field: field + 'issuefixing',
        headerGroupShow: 'open',
        headerGroup: profile.name,
        editable: true,
        valueGetter: function (params) { 
          return params.data[field] * profile.issueFixingModifier / 100 || ''; 
        }
      };
    
      result.push(thirdColumn);
    }

    if (profile.hasManualTesting) {
      var forthColumn = {
        headerName: 'Manual Testing',
        field: 'manualfixing',
        headerGroupShow: 'open',
        headerGroup: profile.name,
        editable: true, 
        valueGetter: function (params) { 
          return params.data[field] * profile.manualTestingModifier / 100 || ''; 
        }
      };
      result.push(forthColumn);
    }

    if (profile.hasIssueFixing || profile.hasUnitTesting || profile.hasManualTesting) {
      var fifthColumn = {
        headerName: 'Total',
        field: field + 'total',
        headerGroupShow: 'open',
        headerGroup: profile.name,
        editable: true,
        valueGetter: function (params) {
          var firstColumnValue = parseInt(params.data[field]) || 0;
          var secondColumnValue = profile.hasUnitTesting ? (parseInt(firstColumnValue * profile.unitTestingModifier / 100)) : 0;
          var thirdColumnValue = profile.hasIssueFixing ? (parseInt(firstColumnValue * profile.issueFixingModifier / 100)) : 0;
          var forthColumnValue = profile.hasManualTesting ? (parseInt(firstColumnValue * profile.manualTestingModifier / 100)) : 0;

          var totalValue = firstColumnValue + secondColumnValue + thirdColumnValue + forthColumnValue;

          if (params.data.total) {
            params.data.total[field] = totalValue;
          }

          return totalValue || 0;
        }
      };

      result.push(fifthColumn);
    }
    
    return result;
  };

  var total = function () {
    var column = {
      headerName: 'Total',
      field: 'total',
      editable: false,
      valueGetter: function (params) {
        function sumTotals(obj) {
          var sum = 0;
          for (var value in obj ) {
            if (obj.hasOwnProperty(value)) {
              sum += parseInt(obj[value]) || 0;
            }
          }
          return sum;
        }

        return sumTotals(params.data.total);
      } 
    };

    return column;
  };

  return {
    build: build,
    total: total
  };
});