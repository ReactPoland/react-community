/**
  @api {post} /api/user/addUser/ Add new user to database
  @apiDescription Add new user to database.

  **Warning** It is a temporary solution and will removed after authorization flow.
  @apiName Add new user
  @apiGroup Users

  @apiParam {String} firstName Users first name.
  @apiParam {String} lastName Users last name.
  @apiParam {String} pictureURL=http://lorempixel.com/100/100/cats/7/ URL image (avatar).

  @apiExample Example usage:
  POST /api/user/addUser HTTP/1.1

  {
      "firstName": "Peter2",
      "lastName": "Pan"
  }
  @apiSuccessExample Example data on success:
  {
    "message": {
      "id": 3,
      "firstName": "Peter2",
      "lastName": "Pan",
      "pictureURL": "http://lorempixel.com/100/100/cats/7/",
      "updatedAt": "2017-04-04T09:06:01.814Z",
      "createdAt": "2017-04-04T09:06:01.814Z"
    },
    "type": "success"
  }
 */

// TODO: temporary solution. Must be added by self action
const UserModel = require('../../db').users;

const addUserRequest = async ({firstName, lastName, pictureURL = 'http://lorempixel.com/100/100/cats/7/'}) => {
  return await UserModel.create({
    firstName, lastName, pictureURL
  });
};

const addUser = (data) => addUserRequest(data.body);

export default addUser;
