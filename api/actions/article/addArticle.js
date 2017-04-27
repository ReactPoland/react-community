const ArticleModel = require('../../db').articles;
const { sequelize } = ArticleModel;
const resp = require('../../utils/serverResp');
import * as ArticleValidation from '../../utils/validation/article';
import { getSlug } from '../../utils/slug';

const addArticleRequest = async ({title, content, previewSize = [1, 1] }) => { // TODO: remove default previewSize
  const articleBody = ArticleValidation.checkArticleBody({title, content, previewSize});
  return await ArticleModel.create({
    ...articleBody,
    slug: getSlug(sequelize, title)
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
