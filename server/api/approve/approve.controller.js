/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/approve              ->  index
 * POST    /api/approve              ->  create
 * GET     /api/approve/:id          ->  show
 * PUT     /api/approve/:id          ->  upsert
 * PATCH   /api/approve/:id          ->  patch
 * DELETE  /api/approve/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
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
// Gets a single Approve from the DB
export function show(req, res) {
  var data = {
    "bts:Get_customer_decisionRequest":{
      "@xmlns":{
        "bts":"http://bts.com/Processes/Core/ContentTransmissionBooking/BTS",
        "bts1":"http://www.example.org/BTS"
      },
      "bts1:RequestId":{
        $:req.params.id
      },
      "bts1:approved":{
        $:'true'
      }
    }
  };
  var opt = {
    uri:'http://ubuntu.estebanf.com:8080/everteam/ode/processes/BTS/Processes/Core/ContentTransmissionBooking/BTS/Client',
    method:'POST',
    headers:{
      'Content-Type':'application/json/badgerfish'
    },
    body: JSON.stringify(data)
  }
  rp(opt).then(function(parsedBody){
    return res.status(200).json(parsedBody);
  });
}
