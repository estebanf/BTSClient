'use strict';

describe('Component: ApprovalComponent', function() {
  // load the controller's module
  beforeEach(module('btsclientApp.approval'));

  var ApprovalComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ApprovalComponent = $componentController('approval', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
