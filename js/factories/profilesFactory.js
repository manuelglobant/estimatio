'use strict';

var module = angular.module('profilesFactory', []);

module.factory('profilesFactory', function(columnsFactory) {
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
      name: 'Visual Designer',
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
    x.columns = columnsFactory.calculate(x);
    availableProfiles.push(x);
  });

  var add = function (profileName) {
    var prof = {
      name: profileName,
      hasUnitTesting: false,
      hasIssueFixing: false,
      hasManualTesting: false,
      unitTestingModifier: 0,
      issueFixingModifier: 0
    };
    prof.columns = columnsFactory.calculate(prof);
    profiles.push(prof);
  };

  var selected = function () {
    return selectedProfiles;
  };

  var select = function (profile) {
    var selectedProfile = profiles.filter(function(x){
      return profile.name === x.name;
    })[0];

    selectedProfiles.push(selectedProfile);

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