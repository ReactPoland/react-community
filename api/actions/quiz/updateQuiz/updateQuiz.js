const QuizModel = require('../../../db').quizzes;
const resp = require('../../../utils/serverResp');

/**
  @api {POST} /api/quiz/update Update quiz instance
  @apiDescription Update quiz in the database
  @apiName Update quiz
  @apiGroup Quiz

  @apiParam {String} [title] Quiz title.
  @apiParam {String} [description] Preview text for quiz.
  @apiParam {String} id Unique quiz ID.

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/quiz/update HTTP/1.1

  {
  	"id" : 2,
  	"description": "new description",
  	"title": "updated title"
  }

  @apiSuccessExample Example data on success:
  {
    "message": {
      "id": 2,
      "title": "updated title",
      "description": "new description",
      "createdAt": "2017-04-13T08:46:27.283Z",
      "updatedAt": "2017-04-13T09:35:41.619Z"
    },
    "type": "success"
  }
 */

const updateQuizRequest = async (req) => {
  const { description, title, id } = req.body;

  const currItem = await QuizModel.findOne({
    where: { id }
  })
  .catch(() => null);
  if (!currItem) throw resp.error('quiz not found');

  const createResp = await QuizModel.update({
    description: description || currItem.description,
    title: title || currItem.title
  }, {
    where: {
      id: currItem.id
    },
    returning: true
  })
  .then((response) => resp.success(response[1][0])) // first element
  .catch(err => err);

  if ( createResp.type !== 'success' ) throw resp.error(createResp.message);

  return createResp;
};

export default updateQuizRequest;
