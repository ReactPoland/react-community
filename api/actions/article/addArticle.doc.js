/**
  @api {POST} /api/article/addArticle/ Add new article
  @apiDescription Add new article to database
  @apiName Add article
  @apiGroup Article

  @apiPermission Staff privileges.

  @apiParam {String} title Article title.
  @apiParam {String} [content] Article body (will ignore for articles with type:`external`).
  @apiParam {Array} [previewSize] Article desktop thumbnail size.
  @apiParam {String} type Type article [`external`, `own`].
  @apiParam {String} [link] External link on the article (will ignore for articles with type:`own`).
  @apiParam {String} [description] Type article [`external`, `own`].
 */
