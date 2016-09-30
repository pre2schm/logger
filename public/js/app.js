'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/summary', {
      templateUrl: 'partials/summary',
      controller: 'summary'
    }).
    when('/ashp/:num', {
      templateUrl: 'partials/template',
      controller: 'templateCtrl'
    }).
    otherwise({
      redirectTo: '/summary'
    });

  $locationProvider.html5Mode(true);
});
