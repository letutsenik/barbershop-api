import pull from 'lodash/pull';
import { makeCompany } from './company';
import { notFoundElement } from '../../../utils/notFoundElement';
import { validateCompany } from './company';
import { makeEntities } from '../common/entity/makeEntities';

export const makeCompanies = ({ database, errorHandler }) => {
	return {
		...makeCompaniesEntity({ database, errorHandler }),
		...makeExtendCompanies({ database, errorHandler })
	};
};

export const makeCompaniesEntity = makeEntities({
	EntityName: 'Company',
	makeEntity: makeCompany,
	validateEntity: validateCompany
});

export const makeExtendCompanies = ({ database, errorHandler }) => {
	return Object.freeze({
		setMaster,
		deleteMaster,
	});

	async function setMaster (companyId, masterId) {
		try {
			const company = await database.models.Company.scope(['withMasters']).findByPk(companyId);
			if (!company) return notFoundElement(companyId);
			const master = await database.models.Master.findByPk(masterId);
			if (!master) return notFoundElement(masterId);

			const masters = company.masters;

			await company.setMasters([...masters, master]);
			const companyWithMasters = await database.models.Company.scope(['withMasters']).findByPk(companyId);
			return {
				success: true,
				data: companyWithMasters
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function deleteMaster (companyId, masterId) {
		try {
			const company = await database.models.Company.findByPk(companyId);
			if (!company) return notFoundElement(companyId);

			const masters = await company.getMasters();
			const mastersIds = masters.map(master => master.id);
			if (!mastersIds.includes(Number(masterId))) {
				return notFoundElement(masterId);
			}
			const restMastersIds = pull(mastersIds, Number(masterId));
			await company.setMasters(restMastersIds);
			const companyWithMasters = await database.models.Company.scope(['withMasters']).findByPk(companyId);
			return {
				success: true,
				data: companyWithMasters
			};
		} catch (error) {
			errorHandler(error);
		}
	}
};
