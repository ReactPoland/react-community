const AnswerModel = require('../../../db').quizAnswers;
const resp = require('../../../utils/serverResp');

/**
  @api {POST} /api/quiz/update/answers Update answers
  @apiDescription Update answers in the database
  @apiName Update answers
  @apiGroup Quiz

  @apiParam {Object[]} answers List of answers.
  @apiParam {Number}   [answers.questionId]   The question unique ID. Receive from /api/quiz/add/questions
  @apiParam {Bool}   [answers.correct]   Check if correct answer.
  @apiParam {String}   [answers.answer] The answer string.
  @apiParam {Number} answers.id The answer unique ID.

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/quiz/update/answers HTTP/1.1

  {
    "answers": [{
    	"answer": "This is an updated test answer",
    	"id" : 5
    }]
  }

  @apiSuccessExample Example data on success:
  [
    {
      "message": {
        "id": 5,
        "answer": "This is an updated test answer",
        "correct": true,
        "createdAt": "2017-04-13T09:14:42.062Z",
        "updatedAt": "2017-04-13T09:45:07.822Z",
        "questionId": 3
      },
      "type": "success"
    }
  ]
*/

const updateQuizAnswers = async (req) => {
  const { answers } = req.body;
  if (!answers || !answers.length) throw new Error('answers not found');

  const serverAnswer = [];

  const answerItems = await AnswerModel.findAll({
    where: {
      id: {
        $in: answers.map(ques => ques.id)
      }
    }
  });


  for (const answerInstance of answerItems) {
    // console.log('answer', answerInstance.toJSON());
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
