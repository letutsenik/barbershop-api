import requiredParam from '../../../utils/required-param';
import { InvalidPropertyError } from '../../../utils/errors';
import isNumber from 'lodash/isNumber';
import upperFirst from '../../../utils/upper-first';

export const makeCompany = (orderInfo = requiredParam('orderInfo')) => {
	const validOrder = validate(orderInfo);
	const normalOrder = normalize(validOrder);
	return Object.freeze(normalOrder);

	function validate ({
		title = requiredParam('title'),
		description = requiredParam('description'),
		masterId = requiredParam('masterId'),
		...otherInfo
	} = {}) {
		validateTitle('title', title);
		validateDescription('description', description);
		validateMasterId(masterId);
		return { title, description, masterId, ...otherInfo };
	}
};

function validateTitle (label, field) {
	if (field.length > 12) {
		throw new InvalidPropertyError(
			`A order's ${label} is too long.`
		);
	}
}

function validateDescription (label, field) {
	if (field.length > 30) {
		throw new InvalidPropertyError(
			`A order's ${label} is too long.`
		);
	}
}

function validateMasterId (masterId) {
	if (!isNumber(masterId)) {
		throw new InvalidPropertyError('Invalid master Id.');
	}
}

function normalize ({ title, description, masterId, ...otherInfo }) {
	const normalized = {
		...otherInfo
	};
	if (title) {
		normalized.title = upperFirst(title.toLowerCase());
	}
	if (description) {
		normalized.description = upperFirst(description.toLowerCase());
	}
	if (masterId) {
		normalized.masterId = masterId;
	}

	return normalized;
}

export function validateOrder (orderInfo = requiredParam('orderInfo')) {
	const { title, description, masterId, ...otherInfo } = orderInfo;
	if (title) {
		validateTitle('title', title);
	}
	if (description) {
		validateDescription('description', description);
	}
	if (masterId) {
		validateMasterId(masterId);
	}

	const normalOrder = normalize(orderInfo);
	return Object.freeze(normalOrder);
}
