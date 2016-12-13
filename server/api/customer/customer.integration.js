'use strict';

var app = require('../..');
import request from 'supertest';

var newCustomer;

describe('Customer API:', function() {
  describe('GET /api/customers', function() {
    var customers;

    beforeEach(function(done) {
      request(app)
        .get('/api/customers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          customers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      customers.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/customers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/customers')
        .send({
          name: 'New Customer',
          info: 'This is the brand new customer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCustomer = res.body;
          done();
        });
    });

    it('should respond with the newly created customer', function() {
      newCustomer.name.should.equal('New Customer');
      newCustomer.info.should.equal('This is the brand new customer!!!');
    });
  });

  describe('GET /api/customers/:id', function() {
    var customer;

    beforeEach(function(done) {
      request(app)
        .get(`/api/customers/${newCustomer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          customer = res.body;
          done();
        });
    });

    afterEach(function() {
      customer = {};
    });

    it('should respond with the requested customer', function() {
      customer.name.should.equal('New Customer');
      customer.info.should.equal('This is the brand new customer!!!');
    });
  });

  describe('PUT /api/customers/:id', function() {
    var updatedCustomer;

    beforeEach(function(done) {
      request(app)
        .put(`/api/customers/${newCustomer._id}`)
        .send({
          name: 'Updated Customer',
          info: 'This is the updated customer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCustomer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCustomer = {};
    });

    it('should respond with the original customer', function() {
      updatedCustomer.name.should.equal('New Customer');
      updatedCustomer.info.should.equal('This is the brand new customer!!!');
    });

    it('should respond with the updated customer on a subsequent GET', function(done) {
      request(app)
        .get(`/api/customers/${newCustomer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let customer = res.body;

          customer.name.should.equal('Updated Customer');
          customer.info.should.equal('This is the updated customer!!!');

          done();
        });
    });
  });

  describe('PATCH /api/customers/:id', function() {
    var patchedCustomer;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/customers/${newCustomer._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Customer' },
          { op: 'replace', path: '/info', value: 'This is the patched customer!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCustomer = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCustomer = {};
    });

    it('should respond with the patched customer', function() {
      patchedCustomer.name.should.equal('Patched Customer');
      patchedCustomer.info.should.equal('This is the patched customer!!!');
    });
  });

  describe('DELETE /api/customers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/customers/${newCustomer._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when customer does not exist', function(done) {
      request(app)
        .delete(`/api/customers/${newCustomer._id}`)
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
