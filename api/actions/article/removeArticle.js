const ArticleModel = require('../../db').articles;

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
  return data.permission.shouldAuth().then(() => removeArticleRequest(data.body));
};

export default removeArticle;
