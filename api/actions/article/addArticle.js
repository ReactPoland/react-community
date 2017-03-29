const ArticleModel = require('../../db').articles;
const resp = require('../../utils/serverResp');

const addArticleRequest = async ({title, content}) => {
  return await ArticleModel.create({
    title, content
  })
  .then(respMess => resp.success(respMess))
  .catch(err => resp.error(err.message));
};

function addArticle(data) {
  return addArticleRequest(data.body);
}

export default addArticle;
