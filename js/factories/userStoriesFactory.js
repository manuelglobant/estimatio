'use strict';

var module = angular.module('userStoriesFactory', []);

module.factory('userStoriesFactory', function() {
  var userStories = [
    {owner: 'Estimator 1', number: 'US-01', name: 'User Store 1', release: '1', details: 'As a user, I want to...', type: 'User Story'},
    {owner: 'Estimator 1', number: 'US-02', name: 'User Store 1', release: '1', details: 'As a user, I want to...', type: 'User Story'},
    {owner: 'Estimator 1', number: 'US-03', name: 'User Store 1', release: '1', details: 'As a user, I want to...', type: 'User Story'},
    {owner: 'Estimator 1', number: 'US-04', name: 'User Store 1', release: '1', details: 'As a user, I want to...', type: 'User Story'}
  ];

  var add = function (userStory) {
    userStories.push(userStory);
  };

  var get = function () {
    return userStories;
  };

  return {
    get: get,
    add: add
  };
});