const ArticleModel = require('../../db').articles;
const resp = require('../../utils/serverResp');
import * as ArticleValidation from '../../utils/validation/article';

const updateArticleRequest = async ({title, content, id, previewSize}) => {
  const articleBody = ArticleValidation.checkArticleBody({title, content, previewSize});

  return await ArticleModel.update({
    ...articleBody
  }, {
    where: {
      id
    }
  })
  .then((respMess) => resp.success(respMess))
  .catch(err => resp.error(err.message));
};

function updateArticle(data) {
  return data.permission.shouldAuth().then(() => updateArticleRequest(data.body));
}

export default updateArticle;
