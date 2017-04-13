const QuizModel = require('../../../db').quizzes;
const resp = require('../../../utils/serverResp');

/**
  @api {POST} /api/quiz/remove Remove quiz instance
  @apiDescription Remove quiz and related question and their answers from the database
  @apiName Remove quiz
  @apiGroup Quiz

  @apiParam {Number}  The quiz unique ID.

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/quiz/remove HTTP/1.1

  {
  	"id": 2
  }

  @apiSuccessExample Example data on success:
  {
      "message": 1,
      "type": "success"
  }
*/

const updateQuizRequest = async (req) => {
  const { id } = req.body;

  const createResp = await QuizModel.destroy({
    where: { id }
  })
  .then(respMess => resp.success(respMess))
  .catch(err => err);

  if (createResp.type !== 'success') throw resp.error(createResp.message);

  return createResp;
};

export default updateQuizRequest;
