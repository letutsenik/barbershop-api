import { UniqueConstraintError } from './errors';

export default function uniqueParam (param) {
	throw new UniqueConstraintError(param);
}
