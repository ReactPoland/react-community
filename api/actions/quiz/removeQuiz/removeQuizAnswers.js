const AnswerModel = require('../../../db').quizAnswers;

/**
  @api {POST} /api/quiz/remove/answers Remove answers
  @apiDescription Remove answers from the database
  @apiName Remove answers
  @apiGroup Quiz

  @apiParam {Object[]} answers List of answers.
  @apiParam {Number} answers.id The answer unique ID.

  @apiPermission Authorized user from the database See how to authorize(#General:Login).

  @apiExample Example request:
  POST /api/quiz/remove/answers HTTP/1.1

  {
  	"answers": [{
  		"id": 5
  	}]
  }

  @apiSuccessExample Example data on success:
  {
      "message": 1,
      "type": "success"
  }
*/


const updateQuizAnswers = async (req) => {
  const { answers } = req.body;
  if (!answers || !answers.length) throw new Error('answers not found');

  const questItems = await AnswerModel.destroy({
    where: {
      id: {
        $in: answers.map(ques => ques.id)
      }
    },
    returning: true
  });

  return questItems;
};

export default updateQuizAnswers;
