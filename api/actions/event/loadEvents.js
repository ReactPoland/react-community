const EventModel = require('../../db').events;
const UserModel = require('../../db').users;

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
