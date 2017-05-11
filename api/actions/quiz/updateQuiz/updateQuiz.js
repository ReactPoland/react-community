const QuizModel = require('../../../db').quizzes;

const updateQuizRequest = async (req) => {
  const { description, title, id } = req.body;

  const currItem = await QuizModel.findOne({
    where: { id }
  })
  .catch(() => null);
  if (!currItem) throw new Error('quiz not found');

  const createResp = await QuizModel.update({
    description: description || currItem.description,
    title: title || currItem.title
  }, {
    where: {
      id: currItem.id
    },
    returning: true
  })
  .then((response) => response[1][0]); // first element

  return createResp;
};

export default updateQuizRequest;
