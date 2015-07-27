'use strict';

var module = angular.module('userStoriesFactory', []);

module.factory('userStoriesFactory', function (estimationFactory) {
  var __id = 5;
  
  var userStories = [
    { id: 1, owner: 'Estimator 1', number: 'US-01', name: 'User Store 1', release: '1', details: 'As a user, I want to...', type: 'User Story'},
    { id: 2, owner: 'Estimator 1', number: 'US-02', name: 'User Store 1', release: '1', details: 'As a user, I want to...', type: 'User Story'},
    { id: 3, owner: 'Estimator 1', number: 'US-03', name: 'User Store 1', release: '1', details: 'As a user, I want to...', type: 'User Story'},
    { id: 4, owner: 'Estimator 1', number: 'US-04', name: 'User Store 1', release: '1', details: 'As a user, I want to...', type: 'User Story'}
  ];

  var add = function (userStory) {
    userStory.id = __id;
    userStory.owner = estimationFactory.get().technicalEstimators;
    __id++;
    userStories.push(userStory);
  };

  var get = function () {
    return userStories;
  };

  var remove = function (userStory) {
    userStories = userStories.filter(function (x) {
      return userStory.id !== x.id;
    });
  };

  return {
    get: get,
    add: add,
    remove: remove
  };
});