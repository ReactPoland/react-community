/**
  @api {POST} /api/self/fillProfileData/ Fill profile data
  @apiDescription Fill profile data by updating filledProfile field in the database
  @apiName Fill profile data
  @apiGroup Self

  @apiParam {String} [firstName] User first name.
  @apiParam {String} [lastName] User last name.
  @apiParam {String} [pictureURL] user picture

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/self/fillProfileData HTTP/1.1

  {
  	"firstName": "Bill"
  }


  @apiSuccessExample Example data on success:
  {
    "message": {
      "id": 1,
      "firstName": "Bill",
      "lastName": "",
      "pictureURL": "https://avatars2.githubusercontent.com/u/10045865?v=3",
      "ghID": 10045865,
      "filledProfile": true,
      "createdAt": "2017-05-10T10:00:50.112Z",
      "updatedAt": "2017-05-10T11:14:58.439Z"
    },
    "type": "success"
  }

*/
