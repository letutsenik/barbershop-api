import { NotFoundElementError } from './errors';

export function notFoundElement (id) {
	throw new NotFoundElementError(id);
}
