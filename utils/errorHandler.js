import uniqueParam from './unique-param';

export const errorHandler = (error) => {
	const { name } = error;
	if (name === 'SequelizeUniqueConstraintError') {
		const { errors = [] } = error;
		const { message } = errors[0] || {};
		return uniqueParam(message);
	}
	throw error;
};
