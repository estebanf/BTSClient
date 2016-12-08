/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';
var db = {
  Sequelize,
  sequelize: new Sequelize(
    config.sequelize.database,
    config.sequelize.username,
    config.sequelize.password,
    {
      host: config.sequelize.host,
      dialect: config.sequelize.dialect})
};

// Insert models below
db.BtsRequest = db.sequelize.import('../api/bts_request/bts_request.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');

module.exports = db;
