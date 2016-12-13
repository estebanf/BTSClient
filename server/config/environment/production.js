'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP
    || process.env.ip
    || undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT
    || process.env.PORT
    || 8080,

    sequelize: {
      database: process.env.DATABASE || 'bpmsdb',
      username: process.env.USERNAME || 'root',
      password: process.env.PASSWORD || 'everteam',
      host: process.env.DBHOST || 'ubuntu.estebanf.com',
      dialect: 'mysql'

    }
};
