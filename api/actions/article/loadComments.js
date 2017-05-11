const UserModel = require('../../db').users;
const ConversationModel = require('../../db').conversations;

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

const loadCommentsRequest = async ({ body }) => {
  if (!body) throw new Error('bad request type');

  const conversResp = await ConversationModel.findOne({
    where: {
      articleId: body.articleId
    }
  });

  if (!conversResp.item) return [];

  const comments = await conversResp.item.getComments({
    attributes: ['id', 'body', 'conversationId', 'createdAt', 'updatedAt', 'depth', 'parentCommentId'],
    include: [{
      model: UserModel,
      attributes: ['id', 'firstName', 'lastName', 'pictureURL']
    }],
    order: [
      [ 'createdAt', 'DESC']
    ]
  });

  return comments;
};

const loadComments = (req) => loadCommentsRequest(req);

export default loadComments;
