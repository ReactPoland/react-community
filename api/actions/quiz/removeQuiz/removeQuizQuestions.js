const QuestionModel = require('../../../db').quizQuestions;
const resp = require('../../../utils/serverResp');

/**
  @api {POST} /api/quiz/remove/questions Remove questions
  @apiDescription Remove questions and related answers from the database
  @apiName Remove questions
  @apiGroup Quiz

  @apiParam {Object[]} questions List of questions.
  @apiParam {Number} questions.id The question unique ID.

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/quiz/remove/questions HTTP/1.1

  {
  	"questions": [{
  		"id": 3
  	}]
  }

  @apiSuccessExample Example data on success:
  {
      "message": 1,
      "type": "success"
  }
*/

const updateQuizQuestions = async (req) => {
  const { questions } = req.body;
  if (!questions || !questions.length) throw resp.error('questions not found');

  const questItems = await QuestionModel.destroy({
    where: {
      id: {
        $in: questions.map(ques => ques.id)
      }
    },
    returning: true
  })
  .then((response) => resp.success(response)) // first element
  .catch(err => err);

  if ( questItems.type !== 'success' ) throw resp.error(questItems.message);

  return questItems;
};

export default updateQuizQuestions;
