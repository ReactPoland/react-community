const resp = require('../../utils/serverResp');
const CommentModel = require('../../db').comments;
const ConversationModel = require('../../db').conversations;

/**
  @api {POST} /api/self/newComment/ Create comment
  @apiDescription Add new comment for article
  @apiName Create comment
  @apiGroup Self

  @apiParam {String} body Comment message.
  @apiParam {Number} articleId Article id, which user want to comment.

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/self/newComment HTTP/1.1

  {
      "body": "bla bla comment",
      "articleId": 27
  }

  @apiSuccessExample Example data on success:
  {
    "message": {
      "id": 3,
      "body": "bla bla comment",
      "userId": 1,
      "conversationId": 1,
      "updatedAt": "2017-04-04T09:31:05.743Z",
      "createdAt": "2017-04-04T09:31:05.743Z"
    },
    "type": "success"
  }
 */

const getConversationId = async (articleId) => {
  const currConvers = await ConversationModel.findOne({
    where: { articleId }
  })
    .then(item => item && item.toJSON() || null )
    .catch(err => console.log(err.message) || null );

  if (currConvers) {
    return {
      success: true,
      itemId: currConvers.id
    };
  }

  return await ConversationModel.create({
    articleId
  }).then(item => ({
    success: true,
    itemId: item.toJSON().id
  }));
};

const newCommentRequest = async ({ body, session }) => {
  if (!session.user || !session.user.id ) return resp.error('Not authorized');
  if (!body) return resp.error('bad request');

  const { body: commentBody, articleId } = body;

  const converResp = await getConversationId(articleId)
  .catch(err => err);

  if (!converResp.success) return resp.error(converResp.message);

  const commentEntity = {
    body: commentBody,
    userId: session.user.id,
    conversationId: converResp.itemId
  };

  return CommentModel.create(commentEntity)
    .then(respMess => resp.success(respMess))
    .catch(err => resp.error(err.message));
};

const newComment = (req) => newCommentRequest(req);

export default newComment;
