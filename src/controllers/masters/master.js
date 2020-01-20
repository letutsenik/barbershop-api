import requiredParam from '../../../utils/required-param';
import { InvalidPropertyError } from '../../../utils/errors';
import isValidEmail from '../../../utils/is-valid-email.js';
import upperFirst from '../../../utils/upper-first';

export function makeMaster (masterInfo = requiredParam('masterInfo')) {
	const validMaster = validate(masterInfo);
	const normalMaster = normalize(validMaster);
	return Object.freeze(normalMaster);

	function validate ({
		firstName = requiredParam('firstName'),
		lastName = requiredParam('lastName'),
		email = requiredParam('email'),
		password = requiredParam('password'),
		...otherInfo
	} = {}) {
		validateName('first', firstName);
		validateName('last', lastName);
		validateEmail(email);
		return { firstName, lastName, email, password, ...otherInfo };
	}
}

function validateName (label, name) {
	if (name.length < 2) {
		throw new InvalidPropertyError(
			`A contact's ${label} name must be at least 2 characters long.`
		);
	}
}

function validateEmail (emailAddress) {
	if (!isValidEmail(emailAddress)) {
		throw new InvalidPropertyError('Invalid contact email address.');
	}
}

function normalize ({ email, firstName, lastName, password, ...otherInfo }) {
	const normalized = {
		...otherInfo
	};
	if (firstName) {
		normalized.firstName = upperFirst(firstName);
	}
	if (lastName) {
		normalized.lastName = upperFirst(lastName);
	}
	if (email) {
		normalized.email = email.toLowerCase();
	}
	if (email) {
		normalized.email = email.toLowerCase();
	}
	if (password) {
		normalized.password = password;
	}
	return normalized;
}

export function validateMaster (masterInfo = requiredParam('masterInfo')) {
	const { firstName, lastName, email, password, ...otherInfo } = masterInfo;
	if (firstName) {
		validateName('first', firstName);
	}
	if (lastName) {
		validateName('last', lastName);
	}
	if (email) {
		validateEmail(email);
	}

	const normalMaster = normalize(masterInfo);
	return Object.freeze(normalMaster);
}
