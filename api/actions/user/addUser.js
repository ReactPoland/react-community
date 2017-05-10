// TODO: temporary solution. Must be added by self action
const UserModel = require('../../db').users;

const addUserRequest = async ({firstName, lastName, pictureURL = 'http://lorempixel.com/100/100/cats/7/'}) => {
  return await UserModel.create({
    firstName, lastName, pictureURL
  });
};

const addUser = (data) => addUserRequest(data.body);

export default addUser;
