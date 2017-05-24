// const QuizModel = require('../../db').quizzes;
import { loadQuiz } from './load';
import { apiConfig } from '../../config';
import * as MathMethods from '../../utils/MathMethods';
const QuestionModel = require('../../db').quizQuestions;
const AnswerModel = require('../../db').quizAnswers;
const QuizStatModel = require('../../db').quizStats;

const startTestRequest = async (req) => {
  const { quizId } = req.body;
  if (!quizId) throw new Error('quizId not found');

  const userId = req.currentUser.id;
  // clear not finished quizzes before (one day - current user and current quiz)
  const depreciatedQuizzes = await QuizStatModel.findAll({
    where: {
      quizId,
      userId,
      finishTime: null,
      createdAt: {
        $lt: new Date(Date.now() - apiConfig.quiz.delayTime)
      }
    }
  });

  if (depreciatedQuizzes.length) {
    await QuizStatModel.destroy({
      where: {
        id: { $in: depreciatedQuizzes.map(item => item.id) }
      }
    });
  }

  // check available stored tests and send that questions
  // BUG: created 2 days ago and finish day ago !!

  const lastQuizzes = await QuizStatModel.findAll({
    where: {
      quizId,
      userId,
      $or: [{
        finishTime: {
          $gt: new Date(Date.now() - apiConfig.quiz.delayTime)
        }
      }, {
        finishTime: null
      }]
    }
  });

  const lastAnswered = lastQuizzes.find(item => item.finishTime !== null);

  if (lastAnswered) {
    const time = `${lastAnswered.finishTime.getHours()}:${lastAnswered.finishTime.getMinutes()}`;
    throw new Error(`You answered once. Will allow in next day (after ${time})`);
  }

  const notFinished = lastQuizzes.find(item => item.finishTime === null);

  if (notFinished) {
    const previousQuestions = await QuestionModel.findAll({
      include: [{
        attributes: ['answer', 'id'],
        model: AnswerModel,
        as: 'answers'
      }],
      where: {
        id: {
          $in: notFinished.questions
        }
      }
    });

    return previousQuestions;
  }

  const dbQuiz = await loadQuiz(quizId);

  if (!dbQuiz) throw new Error('quiz not found');

  if (dbQuiz.questions.length < apiConfig.quiz.questionLimit) throw new Error('questions less than test list');

  const uniqueRandomValues = MathMethods.getUniqueRandomRange({
    max: dbQuiz.questions.length,
    size: apiConfig.quiz.questionLimit
  });

  // get random question for current quiz
  const randQuestions = uniqueRandomValues.map(uniqRandValue => dbQuiz.questions[uniqRandValue]);

  // write to stats new entity
  await QuizStatModel.create({
    quizId,
    userId,
    questions: randQuestions.map(question => question.id)
  });

  return randQuestions;

  // const questions = [];
  // dbQuestions.questions.length


  // await QuizStatModel.create({
    // quizId,
    // userId,
    // questions
  // });


  // const quizzesResp = await QuizModel.findAll({});

  // return quizzesResp;
};


// const loadQuiz = async (id) => {
//   const quizId = parseInt(id, 10);
//   if (isNaN(quizId)) throw new Error('invalid id');
//
//   const quizResp = await QuizModel.findOne({
//     include: [{
//       model: QuestionModel,
//       as: 'questions',
//       include: [{
//         attributes: ['answer', 'id'],
//         model: AnswerModel,
//         as: 'answers'
//       }]
//     }],
//     where: {
//       id: quizId
//     }
//   });
//
//   return quizResp;
// };
//
//
// const loadQuizQuestion = async (id) => {
//   const questionId = parseInt(id, 10);
//   if (isNaN(questionId)) throw new Error('invalid id');
//
//   const quesionResp = await QuestionModel.findOne({
//     include: [{
//       attributes: ['answer', 'id'],
//       model: AnswerModel,
//       as: 'answers'
//     }],
//     where: {
//       id: questionId
//     }
//   });
//
//   return quesionResp;
// };

const startTest = (req) => {
  return req.permission.shouldAuth().then(() => startTestRequest(req));
  // if (!params || !params.length) return loadQuizzesRequest();
  // if (params.length === 1) return req.permission.onlyStaff().then(() => loadQuiz(params[0]));
  // if (params.length === 2 && params[0] === 'question') return req.permission.onlyStaff().then(() => loadQuizQuestion(params[1]));
  // return Promise.reject(new Error('route not found'));
};

export default startTest;
