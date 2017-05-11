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
  if (!body) throw new Error('bad request type');

  let { id } = body;
  id = parseInt(id, 10);

  if (isNaN(id)) throw new Error('id is not a number');

  return await MarkerModel.destroy({
    where: { id }
  });
};

const removeMarker = (data) => {
  return data.permission.shouldAuth().then(() => removeMarkerRequest(data.body));
};

export default removeMarker;
