const QuestionModel = require('../../../db').quizQuestions;
const resp = require('../../../utils/serverResp');

const addQuizRequest = async (req) => {
  const { questions } = req.body;
  if (!questions || !questions.map) throw resp.error('questions are not found');

  const questionsMap = questions.map(item => ({
    question: item.question,
    quizId: item.quizId
  }));

  const createResp = await QuestionModel.bulkCreate(questionsMap, {returning: true})
  .then((...args) => resp.success(args))
  .catch(err => err);

  if ( createResp.type !== 'success' ) throw resp.error(createResp.message);

  return createResp;
};

export default addQuizRequest;
