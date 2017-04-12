const QuestionModel = require('../../../db').quizQuestions;
const resp = require('../../../utils/serverResp');

const updateQuizQuestions = async (req) => {
  const { questions } = req.body;
  if (!questions || !questions.length) throw resp.error('questions not found');

  const serverAnswer = [];

  const questItems = await QuestionModel.findAll({
    where: {
      id: {
        $in: questions.map(ques => ques.id)
      }
    }
  });


  for (const questionInstance of questItems) {
    const updatedQ = questions.find(item => String(questionInstance.id) === String(item.id));
    if (!updatedQ) continue;
    questionInstance.question = updatedQ.question || questionInstance.question;
    await questionInstance.save({ returning: true })
      .then(item => serverAnswer.push(resp.success(item)))
      .catch(err => serverAnswer.push(resp.error(`Question id: ${questionInstance.id} was not updated: ${err.message}`)));
  }

  return serverAnswer;
};

export default updateQuizQuestions;
