const ArticleModel = require('../../db').articles;

/**
  @api {POST} /api/article/removeArticle/ Remove article
  @apiDescription Remove article from database
  @apiName Remove article
  @apiGroup Article

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

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

const removeArticleRequest = async (body) => {
  if (!body) throw new Error('bad request type');

  let { id } = body;
  id = parseInt(id, 10);

  if (isNaN(id)) throw new Error('id is not a number');

  return await ArticleModel.destroy({
    where: { id }
  });
};

const removeArticle = (data) => {
  return data.permission.onlyStaff().then(() => removeArticleRequest(data.body));
};

export default removeArticle;
