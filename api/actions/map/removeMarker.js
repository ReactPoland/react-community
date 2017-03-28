const resp = require('../../utils/serverResp');
const MarkerModel = require('../../db').markers;

const removeMarkerRequest = async (body) => {
  if (!body) return resp.error('bad request type');

  const { id } = body;

  return await MarkerModel.destroy({
    where: { id }
  })
    .then(data => resp.success(data))
    .catch(err => resp.error(err.message));
};

const removeMarker = (data) => removeMarkerRequest(data.body);

export default removeMarker;
