const resp = require('../../utils/serverResp');
const ArticleModel = require('../../db').articles;

const loadArticlesRequest = async () => {
  return await ArticleModel.findAll({})
    .then(data => resp.success(data))
    .catch(err => resp.error(err.message));
};

const loadArticleRequest = async (id) => {
  return await ArticleModel.findOne({
    where: {
      id
    }
  }).then(data => {
    if (!data) throw resp.error('article not found');
    return resp.success(data);
  })
  .catch(err => {
    throw resp.error(err.message);
  });
};

const loadArticles = (req, params) => {
  if (params.length) return loadArticleRequest(params[0]);

  return loadArticlesRequest();
};

export default loadArticles;
