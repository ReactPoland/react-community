const EventModel = require('../../db').events;
// import * as EventValidation from '../../utils/validation/article';

/**
  @api {POST} /api/event/addEvent/ Add new event
  @apiDescription Add new event to database
  @apiName Add event
  @apiGroup Event

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  googleLocationId

  @apiParam {String} title Event title.
  @apiParam {String} [description] Event body.
  @apiParam {String} [link] Event link.
  @apiParam {Number} lat Latitude coordinate for the marker.
  @apiParam {Number} lng Longitude coordinate for the marker.
  @apiParam {String} [price] Event price.
  @apiParam {Date} [date] Event date.
  @apiParam {String} [googleLocationId] Position id for google map.

  @apiExample Example request:
  POST /api/event/addEvent HTTP/1.1

  {
  	"lat": 30,
  	"lng": 20,
  	"price": 123232.1282,
  	"title": "updated test title",
    "content": "updated test content"
  }

  @apiSuccessExample Example data on success:
  {
    "message": {
      "link": "",
      "description": "",
      "googleLocationId": "",
      "id": 5,
      "organizedById": 1,
      "price": "123232.13",
      "date": null,
      "title": "updated test title",
      "lat": 30,
      "lng": 20,
      "updatedAt": "2017-04-11T12:54:50.143Z",
      "createdAt": "2017-04-11T12:54:50.143Z"
    },
    "type": "success"
  }
 */


const addEventRequest = async (req) => {
  const { price, date, title, link,
    description, lat, lng, googleLocationId } = req.body;

  const organizedById = req.session.user.id;

  const createResp = await EventModel.create({
    organizedById, price, date, title, link,
    description, lat, lng, googleLocationId
  });

  return createResp;
};

function addEvent(data) {
  return data.permission.shouldAuth().then(() => {
    return addEventRequest(data);
  });
}

export default addEvent;
