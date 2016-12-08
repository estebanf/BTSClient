'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var btsRequestCtrlStub = {
  index: 'btsRequestCtrl.index',
  show: 'btsRequestCtrl.show',
  create: 'btsRequestCtrl.create',
  upsert: 'btsRequestCtrl.upsert',
  patch: 'btsRequestCtrl.patch',
  destroy: 'btsRequestCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var btsRequestIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './bts_request.controller': btsRequestCtrlStub
});

describe('BtsRequest API Router:', function() {
  it('should return an express router instance', function() {
    btsRequestIndex.should.equal(routerStub);
  });

  describe('GET /api/bts_requests', function() {
    it('should route to btsRequest.controller.index', function() {
      routerStub.get
        .withArgs('/', 'btsRequestCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/bts_requests/:id', function() {
    it('should route to btsRequest.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'btsRequestCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/bts_requests', function() {
    it('should route to btsRequest.controller.create', function() {
      routerStub.post
        .withArgs('/', 'btsRequestCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/bts_requests/:id', function() {
    it('should route to btsRequest.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'btsRequestCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/bts_requests/:id', function() {
    it('should route to btsRequest.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'btsRequestCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/bts_requests/:id', function() {
    it('should route to btsRequest.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'btsRequestCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
