const resp = require('../../utils/serverResp');
const ArticleModel = require('../../db').articles;

const loadArticlesRequest = async ({ title, content }) => {
  const findFilter = { };

  if (title || content) {
    const where = {};
    if (title) where.title = { like: '%' + title + '%' };
    if (content) where.plainText = { like: '%' + content + '%' };
    findFilter.where = where;
  }

  return await ArticleModel.findAll(findFilter)
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
  const title = req.query && req.query.title || undefined;
  const content = req.query && req.query.content || undefined;

  return loadArticlesRequest({ title, content });
};

export default loadArticles;
