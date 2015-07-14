'use strict';

var module = angular.module('profilesFactory', []);

module.factory('profilesFactory', function (columnsFactory) {
  var profiles = [
    {
      name: 'Frontend',
      hasUnitTesting: true,
      hasIssueFixing: true,
      hasManualTesting: true,
      unitTestingModifier: 35,
      issueFixingModifier: 20,
      changed: false
    },
    {
      name: 'Backend',
      hasUnitTesting: true,
      hasIssueFixing: true,
      hasManualTesting: true,
      unitTestingModifier: 35,
      issueFixingModifier: 20,
      changed: false
    },
    {
      name: 'Visual Designer',
      hasUnitTesting: false,
      hasIssueFixing: true,
      hasManualTesting: true,
      unitTestingModifier: 0,
      issueFixingModifier: 20,
      changed: false
    },
    {
      name: 'Architect',
      hasUnitTesting: false,
      hasIssueFixing: false,
      hasManualTesting: false,
      unitTestingModifier: 0,
      issueFixingModifier: 0,
      changed: false
    },
    {
      name: 'Buisness Analyst',
      hasUnitTesting: false,
      hasIssueFixing: false,
      hasManualTesting: false,
      unitTestingModifier: 0,
      issueFixingModifier: 0,
      changed: false
    },
    {
      name: 'Project Manager',
      hasUnitTesting: false,
      hasIssueFixing: false,
      hasManualTesting: false,
      unitTestingModifier: 0,
      issueFixingModifier: 0,
      changed: false
    }
  ];
  
  profiles.forEach(function (x) {
    x.columns = columnsFactory.build(x);
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
    profile.columns = columnsFactory.build(profile);
    profiles.push(profile);
  };

  var update = function (profile) {
    var updatedProfile = profiles.filter(function (x) {
      return profile.name === x.name;
    })[0];

    updatedProfile.columns = columnsFactory.build(updatedProfile);
  };

  var get = function () {
    return profiles;
  };

  return {
    get: get,
    add: add,
    update: update
  };
});