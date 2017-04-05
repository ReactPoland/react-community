const resp = require('../../utils/serverResp');
const MarkerModel = require('../../db').markers;

/**
  @api {POST} /api/map/removeMarker/ Remove map marker
  @apiDescription Remove marker from the map
  @apiName Remove map marker
  @apiGroup Map

  @apiParam {Number} [id] Marker unique id.

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/map/removeMarker HTTP/1.1

  {
    "id": 19
  }

  @apiSuccessExample Example data on success:
  {
    "message": 1,
    "type": "success"
  }
 */

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
