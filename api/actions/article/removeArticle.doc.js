/**
  @api {POST} /api/article/removeArticle/ Remove article
  @apiDescription Remove article from database
  @apiName Remove article
  @apiGroup Article

  @apiPermission Staff privileges.

  @apiParam {Number} id Article unique id.

  @apiExample Example request:
  POST /api/article/removeArticle HTTP/1.1

  {
    "id": 1
  }
  @apiSuccessExample Example data on success:
  {
    "message": 1,
    "type": "success"
  }
 */
