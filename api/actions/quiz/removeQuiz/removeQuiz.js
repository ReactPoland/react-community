const QuizModel = require('../../../db').quizzes;
const resp = require('../../../utils/serverResp');

const updateQuizRequest = async (req) => {
  const { id } = req.body;

  const createResp = await QuizModel.destroy({
    where: { id }
  })
  .then(respMess => resp.success(respMess))
  .catch(err => err);

  if (createResp.type !== 'success') throw resp.error(createResp.message);

  return createResp;
};

export default updateQuizRequest;
