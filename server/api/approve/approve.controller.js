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

var builder = require('../bts_approval.js');

// Gets a single Approve from the DB
export function show(req, res) {
  builder.sendMessage('true',req,res);
}
