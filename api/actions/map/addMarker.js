const MarkerModel = require('../../db').markers;
const resp = require('../../utils/serverResp');

/**
  @api {POST} /api/map/addMarker/ Create map marker
  @apiDescription Add new marker on the map
  @apiName Create map marker
  @apiGroup Map

  @apiParam {String} name Makrer title.
  @apiParam {String} [link] Marker link.
  @apiParam {String} [description] Preview text for marker.
  @apiParam {String} googleLocationId Position id for google map.
  @apiParam {Number} lat Latitude coordinate for the marker.
  @apiParam {Number} lng Longitude coordinate for the marker.

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/map/addMarker HTTP/1.1

  {
      "name": "New makrer test",
      "link": "http://google.com/",
      "description": "1212 23",
      "lat": 2.505,
      "lng": 41.09,
      "googleLocationId": "6b893c3d05bf5fb2caa4b033c9aa27a41fab6fc3"
   }

  @apiSuccessExample Example data on success:
  {
    "message": {
      "id": 19,
      "name": "New makrer test",
      "link": "http://google.com/",
      "description": "1212 23",
      "lat": 2.505,
      "lng": 41.09,
      "googleLocationId": "6b893c3d05bf5fb2caa4b033c9aa27a41fab6fc3",
      "updatedAt": "2017-04-05T11:03:04.547Z",
      "createdAt": "2017-04-05T11:03:04.547Z"
    },
    "type": "success"
  }
 */

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
