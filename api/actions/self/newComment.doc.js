/**
  @api {POST} /api/self/newComment/ Create comment
  @apiDescription Add new comment for article
  @apiName Create comment
  @apiGroup Self

  @apiParam {String} body Comment message.
  @apiParam {Number} articleId Article id, which user want to comment.
  @apiParam {Number} [parentCommentId] Parent comment id. It needs for replies.

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/self/newComment HTTP/1.1

  {
      "body": "bla bla comment",
      "articleId": 27
  }

  @apiExample Example request for reply:
  POST /api/self/newComment HTTP/1.1

  {
      "body": "bla bla comment",
      "articleId": 27,
      "parentCommentId": 4
  }


  @apiSuccessExample Example data on success:
  {
    "message": {
      "id": 3,
      "body": "bla bla comment",
      "depth": 0
      "userId": 1,
      "conversationId": 1,
      "updatedAt": "2017-04-04T09:31:05.743Z",
      "createdAt": "2017-04-04T09:31:05.743Z"
    },
    "type": "success"
  }

  @apiSuccessExample Example data on success for reply:
  {
    "message": {
      "id": 3,
      "body": "bla bla comment",
      "depth": 1
      "parentCommentId": 4
      "userId": 1,
      "conversationId": 1,
      "updatedAt": "2017-04-04T09:31:05.743Z",
      "createdAt": "2017-04-04T09:31:05.743Z"
    },
    "type": "success"
  }
 */
