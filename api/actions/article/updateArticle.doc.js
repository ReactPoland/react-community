/**
  @api {POST} /api/article/updateArticle/ Update article
  @apiDescription Update article content
  @apiName Update article
  @apiGroup Article

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiParam {String} title Article title.
  @apiParam {String} content Article body.
  @apiParam {Array} previewSize Article desktop thumbnail size.
  @apiParam {Number} id Unique article id, which using for find an article in the database.

  @apiExample Example request:
  POST /api/article/updateArticle HTTP/1.1

  {
    "id" : 7,
    "title": "updated test title",
    "content": "updated test content",
    "previewSize": [1, 2]
  }
  @apiSuccessExample Example data on success:
  {
    "message": [1],
    "type": "success"
  }
 */
