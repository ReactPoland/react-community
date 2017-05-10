const AnswerModel = require('../../../db').quizAnswers;

const addQuizAnswersRequest = async (req) => {
  const { answers } = req.body;
  if (!answers || !answers.map) throw new Error('answers are not found');

  const answersMap = answers.map(({ answer, correct, questionId }) => ({
    answer, correct,
    questionId
  }));

  const createResp = await AnswerModel.bulkCreate(answersMap, {returning: true})
  .then((...args) => args);

  return createResp;
};

export default addQuizAnswersRequest;
