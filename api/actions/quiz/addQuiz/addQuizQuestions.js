const QuestionModel = require('../../../db').quizQuestions;

const addQuizRequest = async (req) => {
  const { questions } = req.body;
  if (!questions || !questions.map) throw new Error('questions are not found');

  const questionsMap = questions.map(item => ({
    question: item.question,
    quizId: item.quizId
  }));

  const createResp = await QuestionModel.bulkCreate(questionsMap, {returning: true})
  .then((...args) => args);

  return createResp;
};

export default addQuizRequest;
