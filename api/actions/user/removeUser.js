// TODO: temporary solution. Must be removed by self action
const UserModel = require('../../db').users;

const removeUserRequest = async (body) => {
  if (!body) throw new Error('bad request type');

  let { id } = body;
  id = parseInt(id, 10);

  if (isNaN(id)) throw new Error('id is not a number');

  return await UserModel.destroy({
    where: { id }
  });
};

const removeUser = (data) => removeUserRequest(data.body);

export default removeUser;
