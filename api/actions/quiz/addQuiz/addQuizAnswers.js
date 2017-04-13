const AnswerModel = require('../../../db').quizAnswers;
const resp = require('../../../utils/serverResp');

const addQuizAnswersRequest = async (req) => {
  const { answers } = req.body;
  if (!answers || !answers.map) throw resp.error('answers are not found');

  const answersMap = answers.map(({ answer, correct, questionId }) => ({
    answer, correct,
    questionId
  }));

  const createResp = await AnswerModel.bulkCreate(answersMap, {returning: true})
  .then((...args) => resp.success(args))
  .catch(err => err);

  if ( !(createResp.type === 'success') ) throw resp.error(createResp.message);

  return createResp;
};

export default addQuizAnswersRequest;
