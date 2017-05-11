const AnswerModel = require('../../../db').quizAnswers;

/**
  @api {POST} /api/quiz/add/answers Create answers
  @apiDescription Add answers to database <br/>
  @apiName Create answers
  @apiGroup Quiz

  @apiParam {Object[]} answers List of answers.
  @apiParam {Number}   answers.questionId   The question unique ID. Receive from /api/quiz/add/questions
  @apiParam {Bool}   [answers.correct]   Check if correct answer.
  @apiParam {String}   answers.answer The answer string.

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/quiz/add/answers HTTP/1.1

  {
  	"answers": [{
  		"answer": "new test answer",
  		"correct": true,
  		"questionId": 3
  	}, {
  		"answer": "next one test answer",
  		"questionId": 4
  	}]
  }

  @apiSuccessExample Example data on success:
  {
    "message": [
      [
        {
          "id": 5,
          "answer": "new test answer",
          "correct": true,
          "questionId": 3,
          "createdAt": "2017-04-13T09:14:42.062Z",
          "updatedAt": "2017-04-13T09:14:42.062Z"
        },
        {
          "id": 6,
          "answer": "next one test answer",
          "correct": false,
          "questionId": 4,
          "createdAt": "2017-04-13T09:14:42.062Z",
          "updatedAt": "2017-04-13T09:14:42.062Z"
        }
      ]
    ],
    "type": "success"
  }
 */

const addQuizAnswersRequest = async (req) => {
  const { answers } = req.body;
  if (!answers || !answers.map) throw new Error('answers are not found');

  const answersMap = answers.map(({ answer, correct, questionId }) => ({
    answer, correct,
    questionId
  }));

  const createResp = await AnswerModel.bulkCreate(answersMap, {returning: true})
  .then((...args) => args);

  return createResp;
};

export default addQuizAnswersRequest;
