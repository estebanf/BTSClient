'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './approval.routes';

export class ApprovalComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('btsclientApp.approval', [uiRouter])
  .config(routes)
  .component('approval', {
    template: require('./approval.html'),
    controller: ApprovalComponent,
    controllerAs: 'approvalCtrl'
  })
  .name;
