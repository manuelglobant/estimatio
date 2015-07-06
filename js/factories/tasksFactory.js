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
    calculateModifiers(task);
    tasks.push(task);
    __taskId++;
  };

  var update = function (newValue) {
    var task = tasks.filter(function(x){return x.id === newValue.id;})[0];
    calculateModifiers(newValue);
    tasks[tasks.indexOf(task)] = newValue;
  };

  var calculateModifiers = function (task) {
    var frontHours = parseInt(task.frontend);
    var backHours = parseInt(task.backend);
    var devHours = frontHours + backHours;
    task.unitTestingFront = Math.ceil((modifiers.unitTestingFront * task.frontend) / 100);
    task.unitTestingBack = Math.ceil((modifiers.unitTestingBack * task.backend) / 100);
    task.issueFixingFront = Math.ceil((modifiers.issueFixingFront * task.frontend) / 100); 
    task.issueFixingBack = Math.ceil((modifiers.issueFixingBack * task.backend) / 100);
    task.manualTestingAll = Math.ceil((modifiers.manualTesting * devHours) / 100);
    task.totalFront = frontHours + task.unitTestingFront + task.issueFixingFront;
    task.totalBack = backHours + task.unitTestingBack + task.issueFixingBack;
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