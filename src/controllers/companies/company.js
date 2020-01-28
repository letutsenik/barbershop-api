import requiredParam from '../../../utils/required-param';
import { InvalidPropertyError } from '../../../utils/errors';
import isNumber from 'lodash/isNumber';
import upperFirst from '../../../utils/upper-first';

export const makeCompany = (companyInfo = requiredParam('companyInfo')) => {
	const validCompany = validate(companyInfo);
	const normalCompany = normalize(validCompany);
	return Object.freeze(normalCompany);

	function validate ({
		title = requiredParam('title'),
		description = requiredParam('description'),
		location = requiredParam('location'),
		...otherInfo
	} = {}) {
		validateTitle('title', title);
		validateDescription('description', description);
		validateLocation(location);
		return { title, description, location, ...otherInfo };
	}
};

function validateTitle (label, field) {
	if (field.length > 12) {
		throw new InvalidPropertyError(
			`A company's ${label} is too long.`
		);
	}
}

function validateDescription (label, field) {
	if (field.length > 30) {
		throw new InvalidPropertyError(
			`A company's ${label} is too long.`
		);
	}
}

function validateLocation (location) {
	if (isNumber(location)) {
		throw new InvalidPropertyError('Invalid location.');
	}
}

function normalize ({ title, description, location, ...otherInfo }) {
	const normalized = {
		...otherInfo
	};
	if (title) {
		normalized.title = upperFirst(title.toLowerCase());
	}
	if (description) {
		normalized.description = upperFirst(description.toLowerCase());
	}
	if (location) {
		normalized.location = location;
	}

	return normalized;
}

export function validateCompany (companyInfo = requiredParam('companyInfo')) {
	const { title, description, location, ...otherInfo } = companyInfo;
	if (title) {
		validateTitle('title', title);
	}
	if (description) {
		validateDescription('description', description);
	}
	if (location) {
		validateLocation(location);
	}

	const normalCompany = normalize(companyInfo);
	return Object.freeze(normalCompany);
}
