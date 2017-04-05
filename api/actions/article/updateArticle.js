const ArticleModel = require('../../db').articles;
const resp = require('../../utils/serverResp');

const updateArticleRequest = async ({title, content, id}) => {
  return await ArticleModel.update({
    title, content
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
