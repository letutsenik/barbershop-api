'use strict';
module.exports = (sequelize, DataTypes) => {
	const Company = sequelize.define('Company', {
		title: DataTypes.STRING,
		description: DataTypes.STRING,
		location: DataTypes.STRING,
	}, {});
	Company.associate = function(models) {
		Company.belongsToMany(models.Master, {
			as: 'masters',
			through: sequelize.models.CompanyMaster,
			foreignKey: 'companyId',
			otherKey   : 'masterId',
		});
	};

	Company.addScope(
		'withMasters',
		() => ({
			include: [
				{
					model: sequelize.models.Master,
					as: 'masters'
				}
			]
		})
	);
	return Company;
};
