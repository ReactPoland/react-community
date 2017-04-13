const QuestionModel = require('../../../db').quizQuestions;
const resp = require('../../../utils/serverResp');

/**
  @api {POST} /api/quiz/add/questions Create questions
  @apiDescription Add questions to database <br/>
  **Warning!** Plan to add functionallity for adding question with answers in one request.
  @apiName Create questions
  @apiGroup Quiz

  @apiParam {Object[]} questions List of questions.
  @apiParam {Number}   questions.quizId   The quiz unique ID. Receive from /api/quiz/add
  @apiParam {String}   questions.question The question string.

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/quiz/add/questions HTTP/1.1

  {
  	"questions": [{
  		"question": "new test question",
  		"quizId": 2
  	}, {
  		"question": "next one test question",
  		"quizId": 2
  	}]
  }

  @apiSuccessExample Example data on success:
  {
    "message": [
      [
        {
          "id": 3,
          "question": "new test question",
          "quizId": 2,
          "createdAt": "2017-04-13T09:04:00.912Z",
          "updatedAt": "2017-04-13T09:04:00.912Z"
        },
        {
          "id": 4,
          "question": "next one test question",
          "quizId": 2,
          "createdAt": "2017-04-13T09:04:00.912Z",
          "updatedAt": "2017-04-13T09:04:00.912Z"
        }
      ]
    ],
    "type": "success"
  }
 */

const addQuizRequest = async (req) => {
  const { questions } = req.body;
  if (!questions || !questions.map) throw resp.error('questions are not found');

  const questionsMap = questions.map(item => ({
    question: item.question,
    quizId: item.quizId
  }));

  const createResp = await QuestionModel.bulkCreate(questionsMap, {returning: true})
  .then((...args) => resp.success(args))
  .catch(err => err);

  if ( createResp.type !== 'success' ) throw resp.error(createResp.message);

  return createResp;
};

export default addQuizRequest;
