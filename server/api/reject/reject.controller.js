/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reject              ->  index
 * POST    /api/reject              ->  create
 * GET     /api/reject/:id          ->  show
 * PUT     /api/reject/:id          ->  upsert
 * PATCH   /api/reject/:id          ->  patch
 * DELETE  /api/reject/:id          ->  destroy
 */

'use strict';

var builder = require('../bts_approval.js');

// Gets a single Approve from the DB
export function show(req, res) {
  builder.sendMessage('false',req,res);
}
