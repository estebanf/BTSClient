'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    database: process.env.DATABASE || 'bpmsdb',
    username: process.env.USERNAME || 'root',
    password: process.env.PASSWORD || 'everteam',
    host: process.env.DBHOST || 'ubuntu.estebanf.com',
    dialect: 'mysql'

  },

  // Seed database on startup
  seedDB: false

};
