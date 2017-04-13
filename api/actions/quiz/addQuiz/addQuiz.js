const QuizModel = require('../../../db').quizzes;
const resp = require('../../../utils/serverResp');

const addQuizRequest = async (req) => {
  const { description, title } = req.body;

  const createResp = await QuizModel.create({
    description, title
  })
  .then(respMess => resp.success(respMess))
  .catch(err => err);

  if ( !(createResp.type === 'success') ) throw resp.error(createResp.message);

  return createResp;
};

export default addQuizRequest;
