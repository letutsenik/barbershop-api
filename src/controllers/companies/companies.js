import pull from 'lodash/pull';
import { makeCompany } from './company';
import { notFoundElement } from '../../../utils/notFoundElement';
import { validateCompany } from './company';

export const makeCompanies = ({ database, errorHandler }) => {
	return Object.freeze({
		create,
		find,
		get,
		update,
		deleteCompany,
		setMaster,
		deleteMaster,
	});

	async function create (companyInfo) {
		try {
			const company = makeCompany(companyInfo);
			const result = await database.models.Company.create(company);

			return {
				success: true,
				created: result
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function find () {
		try {
			const companies = await database.models.Company.scope(['withMasters']).findAll();
			return {
				success: true,
				data: companies
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function get (id) {
		try {
			const company = await database.models.Company
				.scope(['withMasters'])
				.findByPk(id) || notFoundElement(id);
			return {
				success: true,
				data: company
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function update (id, data) {
		try {
			const company = await database.models.Company.findByPk(id);
			if (!company) return notFoundElement(id);
			const validCompany = validateCompany(data);
			const updatedCompany = await company.update(validCompany);

			return {
				success: true,
				data: updatedCompany
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function deleteCompany (id) {
		try {
			const company = await database.models.Company.findByPk(id);
			if (!company) return notFoundElement(id);
			await company.destroy();

			return {
				success: true,
				data: company
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function setMaster (companyId, masterId) {
		try {
			const company = await database.models.Company.findByPk(companyId);
			if (!company) return notFoundElement(companyId);

			const masters = await company.getMasters();
			const mastersIds = masters.map(master => master.id);
			await company.setMasters([ ...mastersIds, masterId]);
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
