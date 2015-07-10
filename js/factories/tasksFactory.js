'use strict';

var module = angular.module('tasksFactory', []);

module.factory('tasksFactory', function() {
  var tasks = [];
  var __taskId = 1;

  var transform = function (task) {
    task.userStory = JSON.parse(task.userStory);
    task.usNumber = task.userStory.number;
    task.usName = task.userStory.name;
    task.usRelease = task.userStory.release;
    return task;
  };

  var add = function (task) {
    task.id = __taskId;
    task = transform(task);
    tasks.push(task);
    __taskId++;
    return task;
  };

  var update = function (newValue) {
    var task = tasks.filter(function(x){return x.id === newValue.id;})[0];
    tasks[tasks.indexOf(task)] = newValue;
  };

  var get = function () {
    return tasks;
  };

  return {
    get: get,
    add: add,
    update: update,
    transform: transform
  };
});