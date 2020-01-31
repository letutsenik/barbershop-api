import { notFoundElement } from '../../../../utils/notFoundElement';

export const makeEntities = ({ EntityName, makeEntity, validateEntity }) => ({ database, errorHandler }) => {
	return Object.freeze({
		create,
		find,
		get,
		update,
		deleteEntity
	});

	async function create (entityInfo) {
		try {
			const entity = makeEntity(entityInfo);
			const result = await database.models[EntityName].create(entity);

			return {
				success: true,
				created: result
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function find (param, scope) {
		try {
			const entities = await database.models[EntityName].scope(scope).findAll(param);
			return {
				success: true,
				data: entities
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function get (id, scope) {
		try {
			const entity = await database.models[EntityName]
				.scope(scope)
				.findByPk(id) || notFoundElement(id);
			return {
				success: true,
				data: entity
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function update (id, data) {
		try {
			const entity = await database.models[EntityName].findByPk(id);
			if (!entity) return notFoundElement(id);
			const validEntity = validateEntity(data);
			const updatedEntity = await entity.update(validEntity);

			return {
				success: true,
				data: updatedEntity
			};
		} catch (error) {
			errorHandler(error);
		}
	}

	async function deleteEntity (id) {
		try {
			const entity = await database.models[EntityName].findByPk(id);
			if (!entity) return notFoundElement(id);
			await entity.destroy();

			return {
				success: true,
				data: entity
			};
		} catch (error) {
			errorHandler(error);
		}
	}
};
