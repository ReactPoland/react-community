const EventModel = require('../../db').events;
// import * as EventValidation from '../../utils/validation/article';

/**
  @api {POST} /api/event/addEvent/ Update event
  @apiDescription Update event to database
  @apiName Update event
  @apiGroup Event

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiParam {String} id Event title.
  @apiParam {String} [title] Event title.
  @apiParam {String} [description] Event body.
  @apiParam {String} [link] Event link.
  @apiParam {Number} [lat] Latitude coordinate for the marker.
  @apiParam {Number} [lng] Longitude coordinate for the marker.
  @apiParam {String} [price] Event price.
  @apiParam {Date} [date] Event date.
  @apiParam {String} [googleLocationId] Position id for google map.

  @apiExample Example request:
  POST /api/event/updateEvent HTTP/1.1

  {
  	"id": 5,
  	"title": " new title"
  }

  @apiSuccessExample Example data on success:
  {
    "message": [1],
    "type": "success"
  }
 */


const updateEventRequest = async (req) => {
  const { id, price, date, title, link,
    description, lat, lng, googleLocationId } = req.body;

  const currEvent = await EventModel.findOne({
    where: { id }
  })
  .catch(() => null);
  if (!currEvent) throw new Error('event not found');

  const createResp = await EventModel.update({
    price: price || currEvent.price,
    date: date || currEvent.date,
    title: title || currEvent.title,
    link: link || currEvent.link,
    description: description || currEvent.description,
    lat: lat || currEvent.lat,
    lng: lng || currEvent.lng,
    googleLocationId: googleLocationId || currEvent.googleLocationId
  }, {
    where: { id }
  });

  return createResp;
};

function updateEvent(data) {
  return data.permission.shouldAuth().then(() => {
    return updateEventRequest(data);
  });
}

export default updateEvent;
