'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var rejectCtrlStub = {
  index: 'rejectCtrl.index',
  show: 'rejectCtrl.show',
  create: 'rejectCtrl.create',
  upsert: 'rejectCtrl.upsert',
  patch: 'rejectCtrl.patch',
  destroy: 'rejectCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var rejectIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './reject.controller': rejectCtrlStub
});

describe('Reject API Router:', function() {
  it('should return an express router instance', function() {
    rejectIndex.should.equal(routerStub);
  });

  describe('GET /api/reject', function() {
    it('should route to reject.controller.index', function() {
      routerStub.get
        .withArgs('/', 'rejectCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/reject/:id', function() {
    it('should route to reject.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'rejectCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/reject', function() {
    it('should route to reject.controller.create', function() {
      routerStub.post
        .withArgs('/', 'rejectCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/reject/:id', function() {
    it('should route to reject.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'rejectCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/reject/:id', function() {
    it('should route to reject.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'rejectCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/reject/:id', function() {
    it('should route to reject.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'rejectCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
