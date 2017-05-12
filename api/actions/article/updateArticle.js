const ArticleModel = require('../../db').articles;
import * as ArticleValidation from '../../utils/validation/article';
import { getSlug } from '../../utils/slug';
const sequelize = require('../../db').sequelize;

const updateArticleRequest = async ({title, content, id, previewSize, link, description}) => {
  const currArticle = await ArticleModel.findOne({
    where: {
      id
    }
  }).then(item => {
    if (!item) throw new Error('article not found');
    return item;
  });

  const articleBody = ArticleValidation.checkArticleBody({
    title: title || currArticle.title,
    content: content || currArticle.title,
    previewSize: previewSize || currArticle.previewSize,
    link: link || currArticle.link,
    description: description || currArticle.description,
    type: currArticle.type
  });

  return await ArticleModel.update({
    ...articleBody,
    slug: getSlug(sequelize, articleBody.title)
  }, {
    where: {
      id
    }
  });
};

function updateArticle(data) {
  return data.permission.onlyStaff().then(() => updateArticleRequest(data.body));
}

export default updateArticle;
