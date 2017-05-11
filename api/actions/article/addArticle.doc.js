/**
  @api {POST} /api/article/addArticle/ Add new article
  @apiDescription Add new article to database
  @apiName Add article
  @apiGroup Article

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiParam {String} title Article title.
  @apiParam {String} content Article body.
  @apiParam {Array} previewSize Article desktop thumbnail size.

  @apiExample Example request:
  POST /api/article/addArticle HTTP/1.1

  {
      "title": "Alan Turing",
      "content": "test content",
      "previewSize": [1, 2]
  }
  @apiSuccessExample Example data on success:
  {
    "message": {
      "id": 30,
      "title": "Alan Turing",
      "previewSize": [1, 2],
      "content": "test content",
      "updatedAt": "2017-04-05T12:22:46.389Z",
      "createdAt": "2017-04-05T12:22:46.389Z"
    },
    "type": "success"
  }
 */
