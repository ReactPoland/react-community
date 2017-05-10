const resp = require('../../utils/serverResp');
const QuizModel = require('../../db').quizzes;
const QuestionModel = require('../../db').quizQuestions;
const AnswerModel = require('../../db').quizAnswers;

const loadQuizzesRequest = async () => {
  const quizzesResp = await QuizModel.findAll({
  })
    .then(items => resp.success(items))
    .catch(err => err);

  if (! (quizzesResp.type === 'success') ) throw resp.error(quizzesResp.message);

  return quizzesResp;
};


const loadQuiz = async (id) => {
  const quizId = parseInt(id, 10);
  if (isNaN(quizId)) throw resp.error('invalid id');

  const quizResp = await QuizModel.findOne({
    include: [{
      model: QuestionModel,
      as: 'questions',
      include: [{
        model: AnswerModel,
        as: 'answers'
      }]
    }],
    where: {
      id: quizId
    }
  })
    .then(items => resp.success(items))
    .catch(err => err);

  if (! (quizResp.type === 'success') ) throw resp.error(quizResp.message);

  return quizResp;
};


const loadQuizQuestion = async (id) => {
  const questionId = parseInt(id, 10);
  if (isNaN(questionId)) throw resp.error('invalid id');

  const quesionResp = await QuestionModel.findOne({
    include: [{
      model: AnswerModel,
      as: 'answers'
    }],
    where: {
      id: questionId
    }
  })
  .then(items => resp.success(items))
  .catch(err => err);

  if (! (quesionResp.type === 'success') ) throw resp.error(quesionResp.message);

  return quesionResp;
};

// api/quiz/load
// api/quiz/load/:quizId
// api/quiz/load/question/:questionId
const loadQuizzes = (req, params) => {
  if (!params || !params.length) return loadQuizzesRequest();
  if (params.length === 1) return loadQuiz(params[0]);
  if (params.length === 2 && params[0] === 'question') return loadQuizQuestion(params[1]);

  return Promise.reject(resp.error('route not found'));
};

export default loadQuizzes;
