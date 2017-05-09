const resp = require('../../utils/serverResp');
const LocationsModel = require('../../db').locations;

const getStatesRequest = async () => {
  return await LocationsModel.findAll({ canonical_name: 'Cieszyn' })
    .then(data => resp.success(data))
    .catch(err => resp.error(err.message));
};

const getStates = () => getStatesRequest();

export default getStates;
