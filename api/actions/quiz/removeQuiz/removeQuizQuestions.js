const QuestionModel = require('../../../db').quizQuestions;

const updateQuizQuestions = async (req) => {
  const { questions } = req.body;
  if (!questions || !questions.length) throw new Error('questions not found');

  const questItems = await QuestionModel.destroy({
    where: {
      id: {
        $in: questions.map(ques => ques.id)
      }
    },
    returning: true
  });

  return questItems;
};

export default updateQuizQuestions;
