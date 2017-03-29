const resp = require('../../utils/serverResp');
const ArticleModel = require('../../db').articles;

const loadArticlesRequest = async () => {
  return await ArticleModel.findAll({})
    .then(data => resp.success(data))
    .catch(err => resp.error(err.message));
};

const loadArticles = () => loadArticlesRequest();

export default loadArticles;
