// TODO: temporary solution. Must be added by self action
const UserModel = require('../../db').users;
const resp = require('../../utils/serverResp');

const addUserRequest = async ({firstName, lastName, pictureURL = 'http://lorempixel.com/100/100/cats/7/'}) => {
  return await UserModel.create({
    firstName, lastName, pictureURL
  })
  .then(respMess => resp.success(respMess))
  .catch(err => resp.error(err.message));
};

const addUser = (data) => addUserRequest(data.body);

export default addUser;
