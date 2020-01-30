import { makeMaster, validateMaster } from './master';

import { makeEntities } from '../common/entity/makeEntities';

export const makeMasters = makeEntities({
	EntityName: 'Master',
	makeEntity: makeMaster,
	validateEntity: validateMaster
});
