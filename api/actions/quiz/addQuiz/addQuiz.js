const QuizModel = require('../../../db').quizzes;

const addQuizRequest = async (req) => {
  const { description, title } = req.body;

  const createResp = await QuizModel.create({
    description, title
  });

  return createResp;
};

export default addQuizRequest;
