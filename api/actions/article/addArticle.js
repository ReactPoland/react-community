const ArticleModel = require('../../db').articles;
const resp = require('../../utils/serverResp');
import * as ArticleValidation from '../../utils/validation/article';

const addArticleRequest = async ({title, content, previewSize}) => {
  const articleBody = ArticleValidation.checkArticleBody({title, content, previewSize});

  return await ArticleModel.create({
    ...articleBody
  })
  .then(respMess => resp.success(respMess))
  .catch(err => resp.error(err.message));
};

function addArticle(data) {
  return data.permission.shouldAuth().then(() => {
    return addArticleRequest(data.body);
  });
}

export default addArticle;
