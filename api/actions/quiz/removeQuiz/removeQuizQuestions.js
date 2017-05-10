const QuestionModel = require('../../../db').quizQuestions;
const resp = require('../../../utils/serverResp');

const updateQuizQuestions = async (req) => {
  const { questions } = req.body;
  if (!questions || !questions.length) throw resp.error('questions not found');

  const questItems = await QuestionModel.destroy({
    where: {
      id: {
        $in: questions.map(ques => ques.id)
      }
    },
    returning: true
  })
  .then((response) => resp.success(response)) // first element
  .catch(err => err);

  if ( questItems.type !== 'success' ) throw resp.error(questItems.message);

  return questItems;
};

export default updateQuizQuestions;
