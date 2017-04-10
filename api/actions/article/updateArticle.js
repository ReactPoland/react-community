const ArticleModel = require('../../db').articles;
const resp = require('../../utils/serverResp');
import * as ArticleValidation from '../../utils/validation/article';

/**
  @api {POST} /api/article/updateArticle/ Update article
  @apiDescription Update article content
  @apiName Update article
  @apiGroup Article

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiParam {String} title Article title.
  @apiParam {String} content Article body.
  @apiParam {Number} id Unique article id, which using for find an article in the database.

  @apiExample Example request:
  POST /api/article/updateArticle HTTP/1.1

  {
    "id" : 7,
    "title": "updated test title",
    "content": "updated test content"
  }
  @apiSuccessExample Example data on success:
  {
    "message": [1],
    "type": "success"
  }
 */

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
