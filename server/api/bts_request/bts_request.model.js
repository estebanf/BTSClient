/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BtsRequest', {
    requestid: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'REQUESTID',
      primaryKey: true
    },
    customerid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'CUSTOMERID'
    },
    eventtype: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'EVENTTYPE'
    },
    eventdatetime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'EVENTDATETIME'
    },
    eventduration: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'EVENTDURATION'
    },
    urgency: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'URGENCY'
    },
    requesttype: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'REQUESTTYPE'
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'LOCATION'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'STATUS'
    },
    assignedroute: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ASSIGNEDROUTE'
    },
    proposal: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PROPOSAL'
    },
    routercost: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'ROUTERCOST'
    },
    hsanrequired: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      field: 'HSANREQUIRED'
    },
    hsancost: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'HSANCOST'
    },
    externalresourcerequired: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      field: 'EXTERNALRESOURCEREQUIRED'
    },
    approvalneeded: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      field: 'APPROVALNEEDED'
    },
    approved: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      field: 'APPROVED'
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CREATED_ON'
    },
    updatedOn: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'UPDATED_ON'
    },
    processId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PROCESS_ID'
    },
    instanceId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'INSTANCE_ID'
    }
  }, {
    tableName: 'BTS_Request',
    timestamps: false
  });
};
