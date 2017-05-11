// TODO: temporary solution. Must be removed
const UserModel = require('../../db').users;

const loadUsersRequest = async () => {
  return await UserModel.findAll({});
};

const loadUsers = () => loadUsersRequest();

export default loadUsers;
