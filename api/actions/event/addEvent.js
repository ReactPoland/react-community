const EventModel = require('../../db').events;
// import * as EventValidation from '../../utils/validation/article';

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
