const resp = require('../../utils/serverResp');
const ArticleModel = require('../../db').articles;

const removeArticleRequest = async (body) => {
  if (!body) return resp.error('bad request type');

  let { id } = body;
  id = parseInt(id, 10);

  if (isNaN(id)) return resp.error('id is not a number');

  return await ArticleModel.destroy({
    where: { id }
  })
    .then(data => resp.success(data))
    .catch(err => resp.error(err.message));
};

const removeArticle = (data) => removeArticleRequest(data.body);

export default removeArticle;
