const resp = require('../../utils/serverResp');
const StateModel = require('../../db').states;

const getStatesRequest = async () => {
  return await StateModel.findAll({})
    .then(data => resp.success(data))
    .catch(err => resp.error(err.message));
};

const getStates = () => getStatesRequest();

export default getStates;
