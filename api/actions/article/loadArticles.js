const resp = require('../../utils/serverResp');
const ArticleModel = require('../../db').articles;

const loadArticlesRequest = async () => {
  return await ArticleModel.findAll({})
    .then(data => resp.success(data))
    .catch(err => resp.error(err.message));
};

const loadArticleRequest = async (id) => {
  const articleResponse = await ArticleModel.findOne({
    where: {
      id
    }
  }).then(data => {
    if (!data) return resp.error('article not found');
    return resp.success(data);
  })
  .catch(err => resp.error(err.message));
  if (articleResponse.type === 'error') throw articleResponse;
  return articleResponse;
};

const loadArticles = (req, params) => {
  if (params.length) return loadArticleRequest(params[0]);
  console.log(req.params, req.props);

  return loadArticlesRequest();
};

export default loadArticles;
