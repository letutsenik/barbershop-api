'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Company.associate = function(models) {
    Company.belongsToMany(models.Master, { through: 'CompanyMaster'})
  };
  return Company;
};
