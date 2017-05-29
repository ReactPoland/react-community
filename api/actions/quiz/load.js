const QuizModel = require('../../db').quizzes;
const QuestionModel = require('../../db').quizQuestions;
const AnswerModel = require('../../db').quizAnswers;
import { apiConfig } from '../../config';
const QuizStatModel = require('../../db').quizStats;

const loadQuizzesRequest = async ({ session }) => {
  const findAllConditions = {
    attributes: ['id', 'title', 'description']
  };

  if (session && session.user && session.user.id) {
    findAllConditions.include = [{
      attributes: ['id', 'finishTime', 'correctPercent', 'questions'],
      model: QuizStatModel,
      as: 'quizStats',
      required: false,
      where: {
        userId: session.user.id,
        finishTime: {
          $gt: new Date(Date.now() - apiConfig.quiz.delayTime)
        }
      }
    }];
  }

  const quizzesResp = await QuizModel.findAll(findAllConditions);

  return quizzesResp;
};


export const loadQuiz = async (id) => {
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
  if (!params || !params.length) return loadQuizzesRequest(req);
  if (params.length === 1) return req.permission.onlyStaff().then(() => loadQuiz(params[0]));
  if (params.length === 2 && params[0] === 'question') return req.permission.onlyStaff().then(() => loadQuizQuestion(params[1]));

  return Promise.reject(new Error('route not found'));
};

export default loadQuizzes;
