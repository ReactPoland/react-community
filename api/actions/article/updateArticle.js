const ArticleModel = require('../../db').articles;
const resp = require('../../utils/serverResp');
import * as ArticleValidation from '../../utils/validation/article';

const updateArticleRequest = async ({title, content, id, previewSize}) => {
  const currArticle = await ArticleModel.findOne({
    where: {
      id
    }
  })
  .catch(() => null);
  if (!currArticle) throw resp.error(currArticle);

  const articleBody = ArticleValidation.checkArticleBody({
    title: title || currArticle.title,
    content: content || currArticle.title,
    previewSize: previewSize || currArticle.previewSize
  });

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
