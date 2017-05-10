const ArticleModel = require('../../db').articles;
const { sequelize } = ArticleModel;
const resp = require('../../utils/serverResp');
import * as ArticleValidation from '../../utils/validation/article';
import { getSlug } from '../../utils/slug';

/**
  @api {POST} /api/article/addArticle/ Add new article
  @apiDescription Add new article to database
  @apiName Add article
  @apiGroup Article

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiParam {String} title Article title.
  @apiParam {String} content Article body.
  @apiParam {Array} previewSize Article desktop thumbnail size.

  @apiExample Example request:
  POST /api/article/addArticle HTTP/1.1

  {
      "title": "Alan Turing",
      "content": "test content",
      "previewSize": [1, 2]
  }
  @apiSuccessExample Example data on success:
  {
    "message": {
      "id": 30,
      "title": "Alan Turing",
      "previewSize": [1, 2],
      "content": "test content",
      "updatedAt": "2017-04-05T12:22:46.389Z",
      "createdAt": "2017-04-05T12:22:46.389Z"
    },
    "type": "success"
  }
 */

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
