const resp = require('../../utils/serverResp');
const MarkerModel = require('../../db').markers;

const removeMarkerRequest = async (id) => {
  return await MarkerModel.destroy({
    where: { id: id }
  })
    .then(data => resp.success(data))
    .catch(err => resp.error(err.message));
};

const removeMarker = (id) => removeMarkerRequest(id);

export default removeMarker;
