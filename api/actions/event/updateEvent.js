const EventModel = require('../../db').events;
// import * as EventValidation from '../../utils/validation/article';

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
    where: { id },
    returning: true
  });

  return createResp;
};

function updateEvent(data) {
  return data.permission.shouldAuth().then(() => {
    return updateEventRequest(data);
  });
}

export default updateEvent;
