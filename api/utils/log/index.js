const LogModel = require('../../db').logs;

const createEntity = async ({ name, body, entityId, userId }) => await LogModel.create({
  name, body, entityId, userId
});

const createNamedEntity = (name) => async ({ body, entityId, userId }) => await createEntity({
  body,
  entityId,
  userId,
  name
});

const addPractice = createNamedEntity('ADD_PRACTICE');
const addTutorial = createNamedEntity('ADD_TUTORIAL');

const updatePractice = createNamedEntity('UPDATE_PRACTICE');
const updateTutorial = createNamedEntity('UPDATE_TUTORIAL');

const removePractice = createNamedEntity('REMOVE_PRACTICE');
const removeTutorial = createNamedEntity('REMOVE_TUTORIAL');

export default {
  addPractice,
  addTutorial,
  updatePractice,
  updateTutorial,
  removePractice,
  removeTutorial
};
