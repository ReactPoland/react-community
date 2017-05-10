const QuizModel = require('../../../db').quizzes;
const resp = require('../../../utils/serverResp');

const updateQuizRequest = async (req) => {
  const { description, title, id } = req.body;

  const currItem = await QuizModel.findOne({
    where: { id }
  })
  .catch(() => null);
  if (!currItem) throw resp.error('quiz not found');

  const createResp = await QuizModel.update({
    description: description || currItem.description,
    title: title || currItem.title
  }, {
    where: {
      id: currItem.id
    },
    returning: true
  })
  .then((response) => resp.success(response[1][0])) // first element
  .catch(err => err);

  if ( createResp.type !== 'success' ) throw resp.error(createResp.message);

  return createResp;
};

export default updateQuizRequest;
