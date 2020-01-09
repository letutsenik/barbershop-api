'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompanyMaster = sequelize.define('CompanyMaster', {
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Company',
        key: 'companyId'
      }
    },
    masterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Master',
        key: 'masterId'
      }
    },
  }, {
    freezeTableName: true,
  });
  CompanyMaster.associate = function(models) {
    CompanyMaster.belongsTo(models.Master, {
      foreignKey: 'masterId',
      as: 'master'
    });
    CompanyMaster.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company'
    });
  };
  return CompanyMaster;
};
