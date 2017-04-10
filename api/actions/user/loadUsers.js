// TODO: temporary solution. Must be removed
const UserModel = require('../../db').users;
const resp = require('../../utils/serverResp');

const loadUsersRequest = async () => {
  return await UserModel.findAll({})
  .then(respMess => resp.success(respMess))
  .catch(err => resp.error(err.message));
};

const loadUsers = () => loadUsersRequest();

export default loadUsers;
