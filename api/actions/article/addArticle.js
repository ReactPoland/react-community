const ArticleModel = require('../../db').articles;
const resp = require('../../utils/serverResp');
import * as ArticleValidation from '../../utils/validation/article';

/**
  @api {POST} /api/article/addArticle/ Add new article
  @apiDescription Add new article to database
  @apiName Add article
  @apiGroup Article

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiParam {String} title Article title.
  @apiParam {String} content Article body.

  @apiExample Example request:
  POST /api/article/addArticle HTTP/1.1

  {
      "title": "Alan Turing",
      "content": "test content"
  }
  @apiSuccessExample Example data on success:
  {
    "message": {
      "id": 30,
      "title": "Alan Turing",
      "content": "test content",
      "updatedAt": "2017-04-05T12:22:46.389Z",
      "createdAt": "2017-04-05T12:22:46.389Z"
    },
    "type": "success"
  }
 */

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
