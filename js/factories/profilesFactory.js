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

  var selectedProfiles = [];
  var availableProfiles = [];
  
  profiles.forEach(function (x) {
    availableProfiles.push(x);
  });

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

  var selected = function () {
    return selectedProfiles;
  };

  var select = function (profile) {    
    selectedProfiles.push(profiles[profiles.indexOf(profile)]);
    
    availableProfiles = availableProfiles.filter(function(x){
      return profile.name !== x.name;
    });
  };

  var available = function () {
    return availableProfiles;
  };

  var get = function () {
    return profiles;
  };

  return {
    get: get,
    add: add,
    select: select,
    selected: selected,
    available: available
  };
});