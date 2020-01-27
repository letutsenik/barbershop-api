export class UniqueConstraintError extends Error {
	constructor (msg) {
		super(msg);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, UniqueConstraintError);
		}
	}
}

export class InvalidPropertyError extends Error {
	constructor (msg) {
		super(msg);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, InvalidPropertyError);
		}
	}
}

export class RequiredParameterError extends Error {
	constructor (param) {
		super(`${param} can not be null or undefined.`);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, RequiredParameterError);
		}
	}
}

export class NotFoundElementError extends Error {
	constructor (elementId) {
		super(`Element with id: ${elementId} not found.`);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, RequiredParameterError);
		}
	}
}

export const makeHttpError = ({ statusCode, errorMessage}) => {
	return { statusCode, errorMessage};
};

export const getStatusCode = (error) => {
	if (error instanceof UniqueConstraintError) return 409;
	if (error instanceof InvalidPropertyError || error instanceof RequiredParameterError) return 400;
	if (error instanceof NotFoundElementError) return 404;
	return 500;
};

