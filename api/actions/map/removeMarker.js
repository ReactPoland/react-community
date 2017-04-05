const resp = require('../../utils/serverResp');
const MarkerModel = require('../../db').markers;

const removeMarkerRequest = async (body) => {
  if (!body) return resp.error('bad request type');

  let { id } = body;
  id = parseInt(id, 10);

  if (isNaN(id)) return resp.error('id is not a number');

  return await MarkerModel.destroy({
    where: { id }
  })
    .then(data => resp.success(data))
    .catch(err => resp.error(err.message));
};

const removeMarker = (data) => {
  return data.permission.shouldAuth().then(() => removeMarkerRequest(data.body));
};

export default removeMarker;
