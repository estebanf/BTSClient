'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('approval', {
      url: '/approval',
      template: '<approval></approval>'
    });
}
