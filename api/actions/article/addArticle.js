const ArticleModel = require('../../db').articles;
const sequelize = require('../../db').sequelize;
import * as ArticleValidation from '../../utils/validation/article';
import { getSlug } from '../../utils/slug';

const addArticleRequest = async ({
  title,
  content,
  previewSize = [1, 1],
  type,
  link,
  description
}) => { // TODO: remove default previewSize
  const articleBody = ArticleValidation.checkArticleBody({title, content, previewSize, type, link, description});
  return await ArticleModel.create({
    ...articleBody,
    slug: getSlug(sequelize, title)
  });
};

function addArticle(data) {
  return data.permission.onlyStaff().then(() => {
    return addArticleRequest(data.body);
  });
}

export default addArticle;
