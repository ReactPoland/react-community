const EventModel = require('../../db').events;
// import * as EventValidation from '../../utils/validation/article';

const removeEventRequest = async (req) => {
  let { id } = req.body;
  id = parseInt(id, 10);

  if (isNaN(id)) throw new Error('id is not a number');

  const createResp = await EventModel.destroy({
    where: { id }
  });

  return createResp;
};

function removeEvent(data) {
  return data.permission.shouldAuth().then(() => {
    return removeEventRequest(data);
  });
}

export default removeEvent;
