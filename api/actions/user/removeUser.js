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
