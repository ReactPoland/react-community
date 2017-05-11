const EventModel = require('../../db').events;
const UserModel = require('../../db').users;

/**
  @api {GET} /api/event/loadEvents/ Load event list
  @apiDescription Fetch all events from the database
  @apiName Fetch events
  @apiGroup Event

  @apiExample Example request:
  GET /api/event/loadEvents HTTP/1.1

 */

const loadEventsRequest = async () => {
  const eventsResp = await EventModel.findAll({
    attributes: ['id', 'price', 'date', 'title', 'link', 'description', 'lat', 'lng', 'googleLocationId', 'createdAt', 'updatedAt'],
    include: [{
      model: UserModel,
      as: 'organizedBy',
      id: 'id',
      attributes: ['id', 'firstName', 'lastName', 'pictureURL']
    }]
  });

  return eventsResp;
};

const loadEvents = (req) => loadEventsRequest(req);

export default loadEvents;
