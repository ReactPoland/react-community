const UserModel = require('../../db').users;
const ConversationModel = require('../../db').conversations;

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
