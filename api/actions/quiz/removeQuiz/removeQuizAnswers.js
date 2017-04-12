const AnswerModel = require('../../../db').quizAnswers;
const resp = require('../../../utils/serverResp');

const updateQuizAnswers = async (req) => {
  const { answers } = req.body;
  if (!answers || !answers.length) throw resp.error('answers not found');

  const questItems = await AnswerModel.destroy({
    where: {
      id: {
        $in: answers.map(ques => ques.id)
      }
    },
    returning: true
  })
  .then((response) => resp.success(response)) // first element
  .catch(err => err);

  if ( questItems.type !== 'success' ) throw resp.error(questItems.message);

  return questItems;
};

export default updateQuizAnswers;
