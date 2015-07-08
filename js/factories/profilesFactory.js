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
      issueFixingModifier: 20,
      changed: false,
      lastSubmited: {
        name: 'Frontend',
        hasUnitTesting: true,
        hasIssueFixing: true,
        hasManualTesting: true,
        unitTestingModifier: 35,
        issueFixingModifier: 20,
        changed: false
      }
    },
    {
      name: 'Backend',
      hasUnitTesting: true,
      hasIssueFixing: true,
      hasManualTesting: true,
      unitTestingModifier: 35,
      issueFixingModifier: 20,
      changed: false,
      lastSubmited: {
        name: 'Backend',
        hasUnitTesting: true,
        hasIssueFixing: true,
        hasManualTesting: true,
        unitTestingModifier: 35,
        issueFixingModifier: 20,
        changed: false
      }
    },
    {
      name: 'Visual Designer',
      hasUnitTesting: false,
      hasIssueFixing: true,
      hasManualTesting: true,
      unitTestingModifier: 0,
      issueFixingModifier: 20,
      changed: false,
      lastSubmited: {
        name: 'Visual Designer',
        hasUnitTesting: false,
        hasIssueFixing: true,
        hasManualTesting: true,
        unitTestingModifier: 0,
        issueFixingModifier: 20,
        changed: false
      }
    },
    {
      name: 'Architect',
      hasUnitTesting: false,
      hasIssueFixing: false,
      hasManualTesting: false,
      unitTestingModifier: 0,
      issueFixingModifier: 0,
      changed: false,
      lastSubmited: {
        name: 'Architect',
        hasUnitTesting: false,
        hasIssueFixing: false,
        hasManualTesting: false,
        unitTestingModifier: 0,
        issueFixingModifier: 0,
        changed: false
      }
    },
    {
      name: 'Buisness Analyst',
      hasUnitTesting: false,
      hasIssueFixing: false,
      hasManualTesting: false,
      unitTestingModifier: 0,
      issueFixingModifier: 0,
      changed: false,
      lastSubmited: {
        name: 'Buisness Analyst',
        hasUnitTesting: false,
        hasIssueFixing: false,
        hasManualTesting: false,
        unitTestingModifier: 0,
        issueFixingModifier: 0,
        changed: false
      } 
    },
    {
      name: 'Project Manager',
      hasUnitTesting: false,
      hasIssueFixing: false,
      hasManualTesting: false,
      unitTestingModifier: 0,
      issueFixingModifier: 0,
      changed: false,
      lastSubmited: {
        name: 'Project Manager',
        hasUnitTesting: false,
        hasIssueFixing: false,
        hasManualTesting: false,
        unitTestingModifier: 0,
        issueFixingModifier: 0,
        changed: false
      }
    }
  ];

  var selectedProfiles = [];
  var availableProfiles = [];
  
  profiles.forEach(function (x) {
    x.columns = columnsFactory.build(x);
    x.lastSubmited.columns = x.columns;
    availableProfiles.push(x);
  });

  var add = function (profileName) {
    var profile = {
      name: profileName,
      hasUnitTesting: false,
      hasIssueFixing: false,
      hasManualTesting: false,
      unitTestingModifier: 0,
      issueFixingModifier: 0,
      changed: false
    };
    profile.lastSubmited = profile;
    profile.columns = columnsFactory.build(profile);
    profile.lastSubmited.columns = columnsFactory.build(profile);
    profiles.push(profile);
    availableProfiles.push(profile);
  };

  var update = function (profile) {
    debugger;
    var updatedProfile = profiles.filter(function (x) {
      return profile.name === x.name;
    })[0];

    updatedProfile.columns = columnsFactory.build(updatedProfile);
    updatedProfile.lastSubmited.columns = columnsFactory.build(updatedProfile);
  };

  var selected = function () {
    return selectedProfiles;
  };

  var select = function (profile) {
    var selectedProfile = profiles.filter(function (x) {
      return profile.name === x.name;
    })[0];

    selectedProfiles.push(selectedProfile);

    availableProfiles = availableProfiles.filter(function (x) {
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
    update: update,
    selected: selected,
    available: available
  };
});