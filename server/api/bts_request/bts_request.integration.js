'use strict';

var app = require('../..');
import request from 'supertest';

var newBtsRequest;

describe('BtsRequest API:', function() {
  describe('GET /api/bts_requests', function() {
    var btsRequests;

    beforeEach(function(done) {
      request(app)
        .get('/api/bts_requests')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          btsRequests = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      btsRequests.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/bts_requests', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bts_requests')
        .send({
          name: 'New BtsRequest',
          info: 'This is the brand new btsRequest!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newBtsRequest = res.body;
          done();
        });
    });

    it('should respond with the newly created btsRequest', function() {
      newBtsRequest.name.should.equal('New BtsRequest');
      newBtsRequest.info.should.equal('This is the brand new btsRequest!!!');
    });
  });

  describe('GET /api/bts_requests/:id', function() {
    var btsRequest;

    beforeEach(function(done) {
      request(app)
        .get(`/api/bts_requests/${newBtsRequest._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          btsRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      btsRequest = {};
    });

    it('should respond with the requested btsRequest', function() {
      btsRequest.name.should.equal('New BtsRequest');
      btsRequest.info.should.equal('This is the brand new btsRequest!!!');
    });
  });

  describe('PUT /api/bts_requests/:id', function() {
    var updatedBtsRequest;

    beforeEach(function(done) {
      request(app)
        .put(`/api/bts_requests/${newBtsRequest._id}`)
        .send({
          name: 'Updated BtsRequest',
          info: 'This is the updated btsRequest!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedBtsRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBtsRequest = {};
    });

    it('should respond with the original btsRequest', function() {
      updatedBtsRequest.name.should.equal('New BtsRequest');
      updatedBtsRequest.info.should.equal('This is the brand new btsRequest!!!');
    });

    it('should respond with the updated btsRequest on a subsequent GET', function(done) {
      request(app)
        .get(`/api/bts_requests/${newBtsRequest._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let btsRequest = res.body;

          btsRequest.name.should.equal('Updated BtsRequest');
          btsRequest.info.should.equal('This is the updated btsRequest!!!');

          done();
        });
    });
  });

  describe('PATCH /api/bts_requests/:id', function() {
    var patchedBtsRequest;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/bts_requests/${newBtsRequest._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched BtsRequest' },
          { op: 'replace', path: '/info', value: 'This is the patched btsRequest!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedBtsRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedBtsRequest = {};
    });

    it('should respond with the patched btsRequest', function() {
      patchedBtsRequest.name.should.equal('Patched BtsRequest');
      patchedBtsRequest.info.should.equal('This is the patched btsRequest!!!');
    });
  });

  describe('DELETE /api/bts_requests/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/bts_requests/${newBtsRequest._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when btsRequest does not exist', function(done) {
      request(app)
        .delete(`/api/bts_requests/${newBtsRequest._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
