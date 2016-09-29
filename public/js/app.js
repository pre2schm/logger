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
    when('/CR2HP1', {
      templateUrl: 'partials/CR2HP1',
      controller: 'CR2HP1'
    }).
    when('/CR2HP2', {
      templateUrl: 'partials/CR2HP2',
      controller: 'CR2HP2'
    }).
    when('/CR2HP3', {
      templateUrl: 'partials/CR2HP3',
      controller: 'CR2HP3'
    }).
    when('/CR3HP1', {
      templateUrl: 'partials/CR3HP1',
      controller: 'CR3HP1'
    }).
    when('/CR3HP2', {
      templateUrl: 'partials/CR3HP2',
      controller: 'CR3HP2'
    }).
    when('/CR3HP3', {
      templateUrl: 'partials/CR3HP3',
      controller: 'CR3HP3'
    }).
    when('/CR3HP4', {
      templateUrl: 'partials/CR3HP4',
      controller: 'CR3HP4'
    }).
    when('/building', {
      templateUrl: 'partials/building',
      controller: 'building'
    }).
    otherwise({
      redirectTo: '/CR3HP2'
    });

  $locationProvider.html5Mode(true);
});
