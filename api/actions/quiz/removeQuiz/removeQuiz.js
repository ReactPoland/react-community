const QuizModel = require('../../../db').quizzes;

const updateQuizRequest = async (req) => {
  const { id } = req.body;

  const createResp = await QuizModel.destroy({
    where: { id }
  });

  return createResp;
};

export default updateQuizRequest;
