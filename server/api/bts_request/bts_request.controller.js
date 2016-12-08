/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/bts_requests              ->  index
 * POST    /api/bts_requests              ->  create
 * GET     /api/bts_requests/:id          ->  show
 * PUT     /api/bts_requests/:id          ->  upsert
 * PATCH   /api/bts_requests/:id          ->  patch
 * DELETE  /api/bts_requests/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {BtsRequest} from '../../sqldb';

var rp = require('request-promise');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of BtsRequests
export function index(req, res) {
  return BtsRequest.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single BtsRequest from the DB
export function show(req, res) {
  return BtsRequest.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
function getRequest(action,obj){
  var data = {
    "bts:Receive_requestRequest":{
      "@xmlns":{
        "bts":"http://bts.com/Processes/Core/ContentTransmissionBooking/BTS",
        "bts1":"http://www.example.org/BTS"
      },
      "bts1:Action":{
        $:action
      },
      "bts1:RequestInfo":{
        "bts1:CustomerId":{ $: obj.customerid + ''},
        "bts1:EventDateTime":{ $: obj.eventdatetime},
        "bts1:EventDuration":{ $: obj.eventduration + ''},
        "bts1:EventType":{ $: obj.eventtype},
        "bts1:RequestType":{ $: obj.requesttype},
        "bts1:Location":{ $: obj.location}
      }
    }
  };
  if(action == 'Modify'){
    data["bts:Receive_requestRequest"]["bts1:RequestId"] = {
      $: obj.requestid
    }
  }
  var opt = {
    uri:'http://ubuntu.estebanf.com:8080/everteam/ode/processes/BTS/Processes/Core/ContentTransmissionBooking/BTS/Client',
    method:'POST',
    headers:{
      'Content-Type':'application/json/badgerfish'
    },
    body: JSON.stringify(data)
  }
  return opt;
}
// Creates a new BtsRequest in the DB
export function create(req, res) {
  rp(getRequest('New',req.body)).then(function(parsedBody){
    console.log(parsedBody);
    return BtsRequest.find({
      where: {
        requestid: JSON.parse(parsedBody)["Receive_requestResponse"]["BTS:RequestId"].$
      }
    }).then(respondWithResult(res))
  })
}

// Upserts the given BtsRequest in the DB at the specified ID
export function upsert(req, res) {
  rp(getRequest('Modify',req.body)).then(function(parsedBody){
    console.log(parsedBody);
    return BtsRequest.find({
      where: {
        requestid: JSON.parse(parsedBody)["Receive_requestResponse"]["BTS:RequestId"].$
      }
    }).then(respondWithResult(res))
  })
}

// Updates an existing BtsRequest in the DB
export function patch(req, res) {
  rp(getRequest('Modify',req.body)).then(function(parsedBody){
    console.log(parsedBody);
    return BtsRequest.find({
      where: {
        requestid: JSON.parse(parsedBody)["Receive_requestResponse"]["BTS:RequestId"].$
      }
    }).then(respondWithResult(res))
  })
}

// Deletes a BtsRequest from the DB
export function destroy(req, res) {
  return BtsRequest.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
