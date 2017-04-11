const EventModel = require('../../db').events;
const resp = require('../../utils/serverResp');
// import * as EventValidation from '../../utils/validation/article';

const removeEventRequest = async (req) => {
  let { id } = req.body;
  id = parseInt(id, 10);

  if (isNaN(id)) throw resp.error('id is not a number');

  const createResp = await EventModel.destroy({
    where: { id }
  })
  .then(respMess => resp.success(respMess))
  .catch(err => err);

  if ( !(createResp.type === 'success') ) throw resp.error(createResp.message);

  return createResp;
};

function removeEvent(data) {
  return data.permission.shouldAuth().then(() => {
    return removeEventRequest(data);
  });
}

export default removeEvent;
