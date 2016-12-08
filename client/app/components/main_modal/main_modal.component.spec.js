'use strict';

describe('Component: mainModal', function() {
  // load the component's module
  beforeEach(module('btsclientApp.main_modal'));

  var mainModalComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    mainModalComponent = $componentController('mainModal', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
