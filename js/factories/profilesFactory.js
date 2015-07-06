'use strict';

var module = angular.module('profilesFactory', []);

module.factory('profilesFactory', function() {
  var profiles = [
    {
      name: 'Frontend',
      hasUnitTesting: true,
      hasIssueFixing: true,
      hasManualTesting: true,
      unitTestingModifier: 35,
      issueFixingModifier: 20
    },
    {
      name: 'Backend',
      hasUnitTesting: true,
      hasIssueFixing: true,
      hasManualTesting: true,
      unitTestingModifier: 35,
      issueFixingModifier: 20
    },
    {
      name: 'Visual Desginer',
      hasUnitTesting: false,
      hasIssueFixing: true,
      hasManualTesting: true,
      unitTestingModifier: 0,
      issueFixingModifier: 20
    },
    {
      name: 'Architect',
      hasUnitTesting: false,
      hasIssueFixing: false,
      hasManualTesting: false,
      unitTestingModifier: 0,
      issueFixingModifier: 0
    },
    {
      name: 'Buisness Analyst',
      hasUnitTesting: false,
      hasIssueFixing: false,
      hasManualTesting: false,
      unitTestingModifier: 0,
      issueFixingModifier: 0
    },
    {
      name: 'Project Manager',
      hasUnitTesting: false,
      hasIssueFixing: false,
      hasManualTesting: false,
      unitTestingModifier: 0,
      issueFixingModifier: 0
    }
  ];

  var selected = [];

  var add = function (profileName) {
    profiles.push(
      {
        name: profileName,
        hasUnitTesting: false,
        hasIssueFixing: false,
        hasManualTesting: false,
        unitTestingModifier: 0,
        issueFixingModifier: 0
      }
    );
  };

  var select = function (profile) {
    selected.push(profiles[profiles.indexOf(profile)]);
  };

  var get = function () {
    return profiles;
  };

  return {
    get: get,
    add: add,
    select: select,
    selected: selected
  };
});