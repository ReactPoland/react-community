const UserModel = require('../../db').users;

const getUserBydId = async (id) => {
  return await UserModel.findById(id)
}
