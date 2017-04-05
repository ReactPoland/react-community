const resp = require('../../utils/serverResp');
const ArticleModel = require('../../db').articles;

/**
  @api {GET} /api/article/loadArticles/ Load article list
  @apiDescription Fetch all articles from the database
  @apiName Fetch articles
  @apiGroup Article

  @apiExample Example request:
  GET /api/article/loadArticles HTTP/1.1

  @apiSuccessExample Example data on success:
  {
    "message": [
      {
        "id": 26,
        "title": "Lorem ipsum",
        "content": "\"{\\\"document\\\":{\\\"data\\\":{},\\\"kind\\\":\\\"document\\\",\\\"nodes\\\":[{\\\"data\\\":{},\\\"kind\\\":\\\"block\\\",\\\"isVoid\\\":false,\\\"type\\\":\\\"paragraph\\\",\\\"nodes\\\":[{\\\"kind\\\":\\\"text\\\",\\\"ranges\\\":[{\\\"kind\\\":\\\"range\\\",\\\"text\\\":\\\"Ea tempor eiusmod occaecat consequat mollit aute magna enim duis commodo. Non in esse ipsum nostrud eu ex dolore commodo aliquip excepteur adipisicing. Voluptate est proident in exercitation incididunt eu dolor sit.\\\",\\\"marks\\\":[]}]}]}]},\\\"kind\\\":\\\"state\\\"}\"",
        "createdAt": "2017-03-31T08:58:50.830Z",
        "updatedAt": "2017-03-31T16:26:05.322Z"
      },
      {
        "id": 29,
        ...
      },
      ...
    ],
    "type": "success"
  }
 */

const loadArticlesRequest = async () => {
  return await ArticleModel.findAll({})
    .then(data => resp.success(data))
    .catch(err => resp.error(err.message));
};

const loadArticles = () => loadArticlesRequest();

export default loadArticles;
