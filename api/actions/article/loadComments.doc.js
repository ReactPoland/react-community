/**
  @api {POST} /api/article/loadComments/ Fetch Comments
  @apiDescription Retail comments for current article
  @apiName Fetch Comments
  @apiGroup Article

  @apiParam {Number} articleId Article id for fetching comments.

  @apiExample Example request:
  POST /api/article/loadComments/ HTTP/1.1

  {
      "articleId": 29
  }

  @apiSuccessExample Example data on success:
  {
    "message": [
      {
        "id": 7,
        "body": "reply for reply",
        ...
      },
      {
        "id": 6,
        "body": "reply for comment",
        "conversationId": 1,
        ...
      }
    ],
    "type": "success"
  }
 */
