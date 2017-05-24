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

    // order as in the quizStats
    const orderedPreviousQuestions = [];
    notFinished.questions.forEach(questionId => {
      orderedPreviousQuestions
        .push(
          previousQuestions.find(quesion => quesion.id === questionId)
        );
    });

    return orderedPreviousQuestions;
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
};

const startTest = (req) => {
  return req.permission.shouldAuth().then(() => startTestRequest(req));
};

export default startTest;
