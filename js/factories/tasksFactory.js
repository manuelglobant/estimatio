'use strict';

var module = angular.module('tasksFactory', []);

module.factory('tasksFactory', function(modifiers) {
  var tasks = [];
  var __taskId = 1;

  var add = function (task) {
    task.id = __taskId;
    task.userStory = JSON.parse(task.userStory);
    task.usNumber = task.userStory.number;
    task.usName = task.userStory.name;
    task.usRelease = task.userStory.release;
    task.unitTestingFront = Math.ceil((modifiers.unitTestingFront * task.frontend) / 100);
    task.unitTestingBack = Math.ceil((modifiers.unitTestingBack * task.backend) / 100);
    task.issueFixingFront = Math.ceil((modifiers.issueFixingFront * task.frontend) / 100); 
    task.issueFixingBack = Math.ceil((modifiers.issueFixingBack * task.backend) / 100);

    tasks.push(task);
    __taskId++;
  };

  var update = function (newValue) {
    var task = tasks.filter(function(x){return x.id === newValue.id;})[0];
    newValue.unitTestingFront = Math.ceil((modifiers.unitTestingFront * newValue.frontend) / 100);
    newValue.unitTestingBack = Math.ceil((modifiers.unitTestingBack * newValue.backend) / 100);
    newValue.issueFixingFront = Math.ceil((modifiers.issueFixingFront * newValue.frontend) / 100); 
    newValue.issueFixingBack = Math.ceil((modifiers.issueFixingBack * newValue.backend) / 100);
    tasks[tasks.indexOf(task)] = newValue;
  };

  var get = function () {
    return tasks;
  };

  return {
    get: get,
    add: add,
    update: update
  };
});