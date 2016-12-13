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

function getRequest(action,obj,_id,long_request){
  var data = {
    "bts:Receive_requestRequest":{
      "@xmlns":{
        "bts":"http://bts.com/Processes/Core/ContentTransmissionBooking/BTS",
        "bts1":"http://www.example.org/BTS"
      },
      "bts1:Action":{
        $:action
      }
    }
  }
  if(action != 'New'){
    data["bts:Receive_requestRequest"]["bts1:RequestId"] = {
      $: _id
    }
  }
  if(long_request){
    data["bts:Receive_requestRequest"]["bts1:RequestInfo"] = {
      "bts1:CustomerId":{ $: obj.customerid + ''},
      "bts1:EventDateTime":{ $: obj.eventdatetime},
      "bts1:EventDuration":{ $: obj.eventduration + ''},
      "bts1:EventType":{ $: obj.eventtype},
      "bts1:RequestType":{ $: obj.requesttype},
      "bts1:Location":{ $: obj.location}
    }
  }
  var opt = {
    uri: (process.env.BPMHOST || 'http://ubuntu.estebanf.com:8080/everteam') + '/ode/processes/BTS/Processes/Core/ContentTransmissionBooking/BTS/Client',
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
  rp(getRequest('New',req.body,0,true)).then(function(parsedBody){
    return BtsRequest.find({
      where: {
        requestid: JSON.parse(parsedBody)["Receive_requestResponse"]["BTS:RequestId"].$
      }
    }).then(respondWithResult(res))
  })
}

// Upserts the given BtsRequest in the DB at the specified ID
export function upsert(req, res) {
  var opt = {};
  if(req.body.action){
    opt = getRequest(req.body.action,null,req.params.id,false)
  }
  else{
    opt = getRequest('Modify',req.body,req.body.requestid,true)
  }
  rp(opt).then(function(parsedBody){
    return BtsRequest.find({
      where: {
        requestid: JSON.parse(parsedBody)["Receive_requestResponse"]["BTS:RequestId"].$
      }
    }).then(respondWithResult(res))
  })
}
