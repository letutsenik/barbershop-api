'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompanyMaster = sequelize.define('CompanyMaster', {
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Company',
        key: 'id'
      }
    },
    masterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Master',
        key: 'id'
      }
    },
  }, {});
  CompanyMaster.associate = function(models) {
    // associations can be defined here
  };
  return CompanyMaster;
};
