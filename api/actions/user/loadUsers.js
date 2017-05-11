/**
  @api {GET} /api/user/loadUsers/ Fetch users
  @apiDescription Fetch user list
  **Warning** It is a temporary solution and will removed after authorization flow.
  @apiName Load users
  @apiGroup Users

  @apiSuccessExample Example data on success:
  {
    "message": [
      {
        "id": 1,
        "firstName": "Alan",
        "lastName": "Turing",
        "pictureURL": "http://lorempixel.com/100/100/cats/7/",
        "createdAt": "2017-04-03T13:46:11.280Z",
        "updatedAt": "2017-04-03T13:46:11.280Z"
      },
      {
        "id": 2,
        "firstName": "Peter",
        "lastName": "Pan",
        "pictureURL": "http://lorempixel.com/100/100/cats/7/",
        "createdAt": "2017-04-04T07:52:41.389Z",
        "updatedAt": "2017-04-04T07:52:41.389Z"
      },
      {
        "id": 3,
        "firstName": "Peter2",
        "lastName": "Pan",
        "pictureURL": "http://lorempixel.com/100/100/cats/7/",
        "createdAt": "2017-04-04T09:06:01.814Z",
        "updatedAt": "2017-04-04T09:06:01.814Z"
      }
    ],
    "type": "success"
  }
 */

// TODO: temporary solution. Must be removed
const UserModel = require('../../db').users;

const loadUsersRequest = async () => {
  return await UserModel.findAll({});
};

const loadUsers = () => loadUsersRequest();

export default loadUsers;
