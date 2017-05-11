const QuizModel = require('../../db').quizzes;
const QuestionModel = require('../../db').quizQuestions;
const AnswerModel = require('../../db').quizAnswers;

/**
  @apiDefine Quiz Quiz
  Currently we have three instances: **quiz**, **question** and **answer**. Chaning theses types possible via api below.
  You can't create a question if was not created quiz instance. Also can't create answer witout question too.
*/

/**
  @api {GET} /api/quiz/load Load quizzes
  @apiDescription Fetch all quizzes from the database
  @apiName Load quizzes
  @apiGroup Quiz

  @apiExample Example request:
  GET /api/quiz/load HTTP/1.1

  @apiSuccessExample Example data on success:
  {
    "message": [
      {
        "id": 2,
        "title": "Temp quiz 1",
        "description": "",
        "createdAt": "2017-04-13T08:46:27.283Z",
        "updatedAt": "2017-04-13T08:46:27.283Z"
      }
    ],
    "type": "success"
  }
 */

 /**
   @api {GET} /api/quiz/load/:quizId Load questions
   @apiDescription Fetch whole quiz with questions and answers from the database
   @apiName Load questions
   @apiGroup Quiz

   @apiParam {Number} quizId Quiz unique id

   @apiExample Example request:
   GET /api/quiz/load/2 HTTP/1.1

   @apiSuccessExample Example data on success:
   {
     "message": {
       "id": 2,
       "title": "Temp quiz 1",
       "description": "",
       "createdAt": "2017-04-13T08:46:27.283Z",
       "updatedAt": "2017-04-13T08:46:27.283Z",
       "questions": [
         {
           "id": 3,
           "question": "new test question",
           "createdAt": "2017-04-13T09:04:00.912Z",
           "updatedAt": "2017-04-13T09:04:00.912Z",
           "quizId": 2,
           "answers": [
             {
               "id": 5,
               "answer": "new test answer",
               "correct": true,
               "createdAt": "2017-04-13T09:14:42.062Z",
               "updatedAt": "2017-04-13T09:14:42.062Z",
               "questionId": 3
             }
           ]
         },
         {
           "id": 4,
           "question": "next one test question",
           "createdAt": "2017-04-13T09:04:00.912Z",
           "updatedAt": "2017-04-13T09:04:00.912Z",
           "quizId": 2,
           "answers": [
             {
               "id": 6,
               "answer": "next one test answer",
               "correct": false,
               "createdAt": "2017-04-13T09:14:42.062Z",
               "updatedAt": "2017-04-13T09:14:42.062Z",
               "questionId": 4
             }
           ]
         }
       ]
     },
     "type": "success"
   }
  */

  /**
    @api {GET} /api/quiz/load/question/:questionId Load question
    @apiDescription Fetch question and answers from the database
    @apiName Load question
    @apiGroup Quiz

    @apiParam {Number} questionId Question unique id

    @apiExample Example request:
    GET /api/quiz/load/question/3 HTTP/1.1

    @apiSuccessExample Example data on success:
    {
        "message": {
            "id": 3,
            "question": "This is a updated questions",
            "createdAt": "2017-04-13T09:04:00.912Z",
            "updatedAt": "2017-04-13T09:39:30.942Z",
            "quizId": 2,
            "answers": [
                {
                    "id": 5,
                    "answer": "This is an updated test answer",
                    "correct": true,
                    "createdAt": "2017-04-13T09:14:42.062Z",
                    "updatedAt": "2017-04-13T09:45:07.822Z",
                    "questionId": 3
                }
            ]
        },
        "type": "success"
    }
   */

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
  if (params.length === 1) return loadQuiz(params[0]);
  if (params.length === 2 && params[0] === 'question') return loadQuizQuestion(params[1]);

  return Promise.reject(new Error('route not found'));
};

export default loadQuizzes;
