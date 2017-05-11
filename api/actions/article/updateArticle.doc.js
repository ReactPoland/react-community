/**
  @api {POST} /api/article/updateArticle/ Update article
  @apiDescription Update article content
  @apiName Update article
  @apiGroup Article

  @apiPermission Staff privileges.

  @apiParam {String} title Article title.
  @apiParam {String} [content] Article body (will ignore for articles with type:`external`).
  @apiParam {Array} [previewSize] Article desktop thumbnail size.
  @apiParam {Number} id Unique article id, which using for find an article in the database.
  @apiParam {String} [link] External link on the article (will ignore for articles with type:`own`).
  @apiParam {String} [description] Type article [`external`, `own`].

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
