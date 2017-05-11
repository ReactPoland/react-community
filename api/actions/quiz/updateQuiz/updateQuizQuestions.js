const QuestionModel = require('../../../db').quizQuestions;
const resp = require('../../../utils/serverResp');

/**
  @api {POST} /api/quiz/update/questions Update questions
  @apiDescription Update questions in the database
  @apiName Update questions
  @apiGroup Quiz

  @apiParam {Object[]} questions List of questions.
  @apiParam {Number}   [questions.quizId]   Quiz unique ID. Receive from /api/quiz/add
  @apiParam {String}   [questions.question] question string.
  @apiParam {Number}   questions.id Question unique ID.

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/quiz/update/questions HTTP/1.1

  {
    "questions": [{
    	"question": "This is a updated question",
    	"id" : 3
    }]
  }

  @apiSuccessExample Example data on success:
  [
    {
      "message": {
        "id": 3,
        "question": "This is a updated question",
        "createdAt": "2017-04-13T09:04:00.912Z",
        "updatedAt": "2017-04-13T09:39:30.942Z",
        "quizId": 2
      },
      "type": "success"
    }
  ]
 */

const updateQuizQuestions = async (req) => {
  const { questions } = req.body;
  if (!questions || !questions.length) throw new Error('questions not found');

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
