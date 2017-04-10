const MarkerModel = require('../../db').markers;
const resp = require('../../utils/serverResp');

const addMarkerRequest = async ({name, link, description, lat, lng, googleLocationId}) => {
  return await MarkerModel.create({
    name, link, description, lat, lng, googleLocationId
  })
  .then(respMess => resp.success(respMess))
  .catch(err => resp.error(err.message));
};

function addMarket(data) {
  return data.permission.shouldAuth().then(() => addMarkerRequest(data.body));
}

export default addMarket;
