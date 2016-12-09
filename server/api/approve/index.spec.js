'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var approveCtrlStub = {
  index: 'approveCtrl.index',
  show: 'approveCtrl.show',
  create: 'approveCtrl.create',
  upsert: 'approveCtrl.upsert',
  patch: 'approveCtrl.patch',
  destroy: 'approveCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var approveIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './approve.controller': approveCtrlStub
});

describe('Approve API Router:', function() {
  it('should return an express router instance', function() {
    approveIndex.should.equal(routerStub);
  });

  describe('GET /api/approve', function() {
    it('should route to approve.controller.index', function() {
      routerStub.get
        .withArgs('/', 'approveCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/approve/:id', function() {
    it('should route to approve.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'approveCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/approve', function() {
    it('should route to approve.controller.create', function() {
      routerStub.post
        .withArgs('/', 'approveCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/approve/:id', function() {
    it('should route to approve.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'approveCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/approve/:id', function() {
    it('should route to approve.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'approveCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/approve/:id', function() {
    it('should route to approve.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'approveCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
