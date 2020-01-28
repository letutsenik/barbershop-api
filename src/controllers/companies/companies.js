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
};
