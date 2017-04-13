const QuizModel = require('../../../db').quizzes;
const resp = require('../../../utils/serverResp');

/**
  @api {POST} /api/quiz/add Create quiz instance
  @apiDescription Add quiz to database
  @apiName Create quiz
  @apiGroup Quiz

  @apiParam {String} title Quiz title.
  @apiParam {String} [description] Preview text for quiz.

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/quiz/add HTTP/1.1

  {
  	"title": "Temp quiz 1"
  }

  @apiSuccessExample Example data on success:
  {
    "message": {
      "description": "",
      "id": 2,
      "title": "Temp quiz 1",
      "updatedAt": "2017-04-13T08:46:27.283Z",
      "createdAt": "2017-04-13T08:46:27.283Z"
    },
    "type": "success"
  }
 */

const addQuizRequest = async (req) => {
  const { description, title } = req.body;

  const createResp = await QuizModel.create({
    description, title
  })
  .then(respMess => resp.success(respMess))
  .catch(err => err);

  if ( !(createResp.type === 'success') ) throw resp.error(createResp.message);

  return createResp;
};

export default addQuizRequest;
