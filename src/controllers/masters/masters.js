import { notFoundElement } from '../../../utils/notFoundElement';
import { makeMaster, validateMaster } from './master';

export const makeMasters = ({ database, errorHandler }) => {
	return Object.freeze({
		create,
		find,
		get,
		update,
		deleteMaster
	});

	async function create (masterInfo) {
		try {
			const master = makeMaster(masterInfo);
			const result = await database.models.Master.create(master);

			return {
				success: true,
				created: result
			};
		} catch (error) {
			errorHandler(error);
		}
	}
	async function find (param) {
		try {
			const masters = await database.models.Master.scope(['withOrders', 'withCompanies']).findAll(param);
			return {
				success: true,
				data: masters
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function get (id) {
		try {
			const master = await database.models.Master
				.scope(['withOrders', 'withCompanies'])
				.findByPk(id) || notFoundElement(id);
			return {
				success: true,
				data: master
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function update (id, data) {
		try {
			const master = await database.models.Master.findByPk(id);
			if (!master) return notFoundElement(id);
			const validMaster = validateMaster(data);
			const updatedMaster = await master.update(validMaster);

			return {
				success: true,
				data: updatedMaster
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function deleteMaster (id) {
		try {
			const master = await database.models.Master.findByPk(id);
			if (!master) return notFoundElement(id);
			await master.destroy();

			return {
				success: true,
				data: master
			};
		} catch (error) {
			errorHandler(error);
		}
	}
};
