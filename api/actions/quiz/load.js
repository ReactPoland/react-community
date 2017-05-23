const QuizModel = require('../../db').quizzes;
const QuestionModel = require('../../db').quizQuestions;
const AnswerModel = require('../../db').quizAnswers;

const loadQuizzesRequest = async () => {
  const quizzesResp = await QuizModel.findAll({});

  return quizzesResp;
};


const loadQuiz = async (id) => {
  const quizId = parseInt(id, 10);
  if (isNaN(quizId)) throw new Error('invalid id');

  const quizResp = await QuizModel.findOne({
    include: [{
      model: QuestionModel,
      as: 'questions',
      include: [{
        attributes: ['answer', 'id'],
        model: AnswerModel,
        as: 'answers'
      }]
    }],
    where: {
      id: quizId
    }
  });

  return quizResp;
};


const loadQuizQuestion = async (id) => {
  const questionId = parseInt(id, 10);
  if (isNaN(questionId)) throw new Error('invalid id');

  const quesionResp = await QuestionModel.findOne({
    include: [{
      attributes: ['answer', 'id'],
      model: AnswerModel,
      as: 'answers'
    }],
    where: {
      id: questionId
    }
  });

  return quesionResp;
};

// api/quiz/load
// api/quiz/load/:quizId
// api/quiz/load/question/:questionId
const loadQuizzes = (req, params) => {
  if (!params || !params.length) return loadQuizzesRequest();
  if (params.length === 1) return req.permission.onlyStaff().then(() => loadQuiz(params[0]));
  if (params.length === 2 && params[0] === 'question') return req.permission.onlyStaff().then(() => loadQuizQuestion(params[1]));

  return Promise.reject(new Error('route not found'));
};

export default loadQuizzes;
