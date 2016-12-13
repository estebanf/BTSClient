/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/customers              ->  index
 * POST    /api/customers              ->  create
 * GET     /api/customers/:id          ->  show
 * PUT     /api/customers/:id          ->  upsert
 * PATCH   /api/customers/:id          ->  patch
 * DELETE  /api/customers/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
var rp = require('request-promise');
var url = require('url');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

// Gets a list of Customers
export function index(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
rp({
  uri: (process.env.CRMHOST || 'http://ubuntu.estebanf.com:3000') + '/api/BtsCustomers?filter[where][customername][like]=' + query["filter[where][customername][like]"],
  method: 'GET',
  headers: {
    'Content-Type':'application/json'
  }
  }).then(function(response){
    res.status(200).json(response);
  })
}

// Gets a single Customer from the DB
export function show(req, res) {
  rp({
    uri: (process.env.CRMHOST || 'http://ubuntu.estebanf.com:3000') + '/api/BtsCustomers/' + req.params.id,
    method: 'GET',
    headers: {
      'Content-Type':'application/json'
    }
  }).then(function(response){
    res.status(200).json(response);
  })
}
