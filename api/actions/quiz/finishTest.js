const QuestionModel = require('../../db').quizQuestions;
const AnswerModel = require('../../db').quizAnswers;
const QuizStatModel = require('../../db').quizStats;

const finishTestRequest = async (req) => {
  const { quizId, replies } = req.body;
  // replies = [{
    // question: 123,
    // answers: [12, 14]
  // }]

  if (!quizId || !replies) throw new Error('required field [quizId, replies] not found');

  const userId = req.currentUser.id;

  const currentQuiz = await QuizStatModel.findOne({
    where: {
      quizId,
      userId,
      finishTime: null,
    }
  }).then(quiz => {
    if (!quiz) throw new Error('quiz not found');
    return quiz;
  });

  const questions = await QuestionModel.findAll({
    include: [{
      attributes: ['answer', 'id', 'correct'],
      model: AnswerModel,
      as: 'answers'
    }],
    where: {
      id: {
        $in: currentQuiz.questions
      }
    }
  });

  // order as in the quizStats
  const orderedQuestions = [];
  currentQuiz.questions.forEach(questionId => {
    orderedQuestions
      .push(
        questions.find(quesion => quesion.id === questionId)
      );
  });

  let correctAnswered = 0;
  const responseAnswers = [];

  orderedQuestions.map(currentQuestion => {
    let answerItem = replies.find(item => item.question === currentQuestion.id);

    // read question as unchecked
    if (!answerItem) {
      answerItem = {
        question: currentQuestion.id,
        answers: []
      };
    }

    const responseQuestion = {
      question: currentQuestion.question,
      id: currentQuestion.id,
      answers: []
    };

    let correctCountAnswered = 0;

    currentQuestion.answers.map(currentAnswer => {
      const responseAnswer = {
        id: currentAnswer.id,
        answer: currentAnswer.answer,
        correct: currentAnswer.correct
      };

      const wasChecked = answerItem.answers.includes(currentAnswer.id);
      responseAnswer.checked = wasChecked;

      const wasCorrectChecked = wasChecked && currentAnswer.correct;
      if (wasCorrectChecked) correctCountAnswered++;

      responseQuestion.answers.push(responseAnswer);
    });

    if (answerItem.answers.length) correctAnswered += correctCountAnswered / answerItem.answers.length;
    responseAnswers.push(responseQuestion);
  });

  const finishTime = new Date();
  const correctPercent = parseFloat((correctAnswered / currentQuiz.questions.length ).toFixed(2), 10);

  await currentQuiz.updateAttributes({
    finishTime,
    correctPercent
  });
  console.log('step', correctAnswered, currentQuiz.questions.length);

  return {
    finishTime,
    correctPercent,
    answers: responseAnswers
  };
};

const finishTest = (req) => {
  return req.permission.shouldAuth().then(() => finishTestRequest(req));
};

export default finishTest;
