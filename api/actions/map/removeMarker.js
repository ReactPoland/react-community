const MarkerModel = require('../../db').markers;

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
