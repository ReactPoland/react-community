const resp = require('../../utils/serverResp');
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
  if (!body) return resp.error('bad request type');

  const conversResp = await ConversationModel.findOne({
    where: {
      articleId: body.articleId
    }
  })
    .then(item => {
      const conver = {
        success: true,
        item: item || null
      };
      return conver;
    })
    .catch(err => err);

  if (!conversResp.success) return resp.error(conversResp.message);
  if (!conversResp.item) return resp.success([]);

  const comments = await conversResp.item.getComments({
    attributes: ['id', 'body', 'conversationId', 'createdAt', 'updatedAt', 'depth', 'parentCommentId'],
    include: [{
      model: UserModel,
      attributes: ['id', 'firstName', 'lastName', 'pictureURL']
    }],
    order: [
      [ 'createdAt', 'DESC']
    ]
  })
  .then(commentsResponse => resp.success(commentsResponse))
  .catch(err => resp.error(err.message));

  // const authorsId = comments.map(commentItem => commentItem.userId);
  // UserModel.findAll({ where: {
    // id:
  // }})
  // console.log();

  return comments;
};

const loadComments = (req) => loadCommentsRequest(req);

export default loadComments;
