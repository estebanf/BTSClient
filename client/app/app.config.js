'use strict';

export function routeConfig($urlRouterProvider, $locationProvider) {
  'ngInject';

  $urlRouterProvider.when('approval','/approval')
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
}
