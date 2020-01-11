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
                       emailAddress = requiredParam('email'),
                       password = requiredParam('password'),
                       ...otherInfo
                     } = {}) {
    validateName('first', firstName);
    validateName('last', lastName);
    validateEmail(emailAddress);
    return { firstName, lastName, emailAddress, password, ...otherInfo }
  }

  function validateName (label, name) {
    if (name.length < 2) {
      throw new InvalidPropertyError(
        `A contact's ${label} name must be at least 2 characters long.`
      )
    }
  }

  function validateEmail (emailAddress) {
    if (!isValidEmail(emailAddress)) {
      throw new InvalidPropertyError('Invalid contact email address.')
    }
  }

  function normalize ({ emailAddress, firstName, lastName, password, ...otherInfo }) {
    return {
      ...otherInfo,
      firstName: upperFirst(firstName),
      lastName: upperFirst(lastName),
      email: emailAddress.toLowerCase(),
      password
    }
  }
}
