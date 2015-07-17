'use strict';

var module = angular.module('columnsFactory', []);

module.factory('columnsFactory', function () {

  var build = function (profile) {
    var result = [];
    var field = profile.name.split(' ').join('').toLowerCase().replace(/[{()}]/g, '');

    var firstColumn = {
      headerName: profile.name,
      field: field,
      editable: true,
      newValueHandler: null
    };

    result.push(firstColumn);

    if (profile.hasUnitTesting) {
      var secondColumn = {
        headerName: profile.name + ' Unit Testing',
        field: field + 'unittesting',
        editable: true,
        valueGetter: function (params) { 
          return params.data[field] * profile.unitTestingModifier / 100 || ''; 
        }
      };
    
      result.push(secondColumn);
    }
    
    if (profile.hasIssueFixing) {
      var thirdColumn = {
        headerName: profile.name + ' Issue Fixing',
        field: field + 'issuefixing',
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
        editable: true, 
        newValueHandler: null
      };
      result.push(forthColumn);
    }

    if (profile.hasIssueFixing || profile.hasUnitTesting) {
      var fifthColumn = {
        headerName: 'Total ' + profile.name,
        field: field + 'total',
        editable: false,
        valueGetter: function (params) {
          var firstColumnValue = parseInt(params.data[field]) || 0;
          
          var secondColumnValue = profile.hasUnitTesting ? (parseInt(params.data[field] * profile.unitTestingModifier / 100)) : 0;
          
          var thirdColumnValue = profile.hasIssueFixing ? (parseInt(params.data[field] * profile.issueFixingModifier / 100)) : 0;

          params.data[field + 'total'] = firstColumnValue + secondColumnValue + thirdColumnValue;
          
          return firstColumnValue + secondColumnValue + thirdColumnValue || '';
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
      editable: true,
      valueGetter: function (params) {
        var frontendTotal = params.data.frontendtotal || 0;
        var backendTotal = params.data.backendtotal || 0;
        var visualTotal = params.data.visualdesignertotal || 0;
        var architect = parseInt(params.data.architect) || 0;
        var buisnessAnalyst = parseInt(params.data.buisnessanalyst) || 0;
        var projectManager = parseInt(params.data.projectmanager) || 0;
        var manualFixing = parseInt(params.data.manualfixing) || 0;

        return frontendTotal + 
          backendTotal + 
          visualTotal + 
          architect + 
          buisnessAnalyst + 
          projectManager + 
          manualFixing;
      } 
    };

    return column;
  };

  return {
    build: build,
    total: total
  };
});