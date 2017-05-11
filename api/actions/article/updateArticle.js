const ArticleModel = require('../../db').articles;
import * as ArticleValidation from '../../utils/validation/article';
import { getSlug } from '../../utils/slug';

const updateArticleRequest = async ({title, content, id, previewSize}) => {
  const currArticle = await ArticleModel.findOne({
    where: {
      id
    }
  });

  const articleBody = ArticleValidation.checkArticleBody({
    title: title || currArticle.title,
    content: content || currArticle.title,
    previewSize: previewSize || currArticle.previewSize
  });

  return await ArticleModel.update({
    ...articleBody,
    slug: getSlug(articleBody.title)
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
