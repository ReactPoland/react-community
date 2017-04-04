/**
  @api {POST} /api/user/removeUser/ Remove user
  @apiDescription Remove user from database
  **Warning** It is a temporary solution and will removed after authorization flow.
  @apiName Remove user
  @apiGroup Users

  @apiParam {Number} id Users unique ID.
  @apiSuccess {Number} message Count of removed users.

  @apiExample Example request:
  POST /api/user/removeUser HTTP/1.1

  {
      "id": "3"
  }

  @apiSuccessExample Example data on success:
  {
    "message": 1,
    "type": "success"
  }
 */

// TODO: temporary solution. Must be removed by self action
const resp = require('../../utils/serverResp');
const UserModel = require('../../db').users;

const removeUserRequest = async (body) => {
  if (!body) return resp.error('bad request type');

  let { id } = body;
  id = parseInt(id, 10);

  if (isNaN(id)) return resp.error('id is not a number');

  return await UserModel.destroy({
    where: { id }
  })
    .then(data => resp.success(data))
    .catch(err => resp.error(err.message));
};

const removeUser = (data) => removeUserRequest(data.body);

export default removeUser;
