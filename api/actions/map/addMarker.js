const MarkerModel = require('../../db').markers;

const addMarkerRequest = async ({name, link, description, lat, lng, googleLocationId}) => {
  return await MarkerModel.create({
    name, link, description, lat, lng, googleLocationId
  });
};

function addMarket(data) {
  return data.permission.shouldAuth().then(() => addMarkerRequest(data.body));
}

export default addMarket;
