const AnswerModel = require('../../../db').quizAnswers;
const resp = require('../../../utils/serverResp');

const updateQuizAnswers = async (req) => {
  const { answers } = req.body;
  if (!answers || !answers.length) throw resp.error('answers not found');

  const serverAnswer = [];

  const answerItems = await AnswerModel.findAll({
    where: {
      id: {
        $in: answers.map(ques => ques.id)
      }
    }
  });


  for (const answerInstance of answerItems) {
    console.log('answer', answerInstance.toJSON());
    const updatedAns = answers.find(item => String(answerInstance.id) === String(item.id));
    if (!updatedAns) continue;
    answerInstance.answer = updatedAns.answer || answerInstance.answer;
    answerInstance.correct = updatedAns.correct || answerInstance.correct;
    await answerInstance.save({ returning: true })
      .then(item => serverAnswer.push(resp.success(item)))
      .catch(err => serverAnswer.push(resp.error(`Question id: ${answerInstance.id} was not updated: ${err.message}`)));
  }

  return serverAnswer;
};

export default updateQuizAnswers;
