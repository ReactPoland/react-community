const AnswerModel = require('../../../db').quizAnswers;

const updateQuizAnswers = async (req) => {
  const { answers } = req.body;
  if (!answers || !answers.length) throw new Error('answers not found');

  const questItems = await AnswerModel.destroy({
    where: {
      id: {
        $in: answers.map(ques => ques.id)
      }
    },
    returning: true
  });

  return questItems;
};

export default updateQuizAnswers;
