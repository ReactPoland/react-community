const EventModel = require('../../db').events;
// import * as EventValidation from '../../utils/validation/article';

/**
  @api {POST} /api/event/removeEvent/ Remove event
  @apiDescription Remove event from database
  @apiName Remove event
  @apiGroup Event

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiParam {Number} id Article unique id.

  @apiExample Example request:
  POST /api/event/removeEvent HTTP/1.1

  {
    "id": 1
  }
  @apiSuccessExample Example data on success:
  {
    "message": 1,
    "type": "success"
  }
 */


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
