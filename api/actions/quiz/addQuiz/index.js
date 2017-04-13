import addQuizRequest from './addQuiz';
import addQuizQuestionsRequest from './addQuizQuestions';
import addQuizAnswersRequest from './addQuizAnswers';
import resp from '../../../utils/serverResp';

// api/quiz/add
// api/quiz/add/questions
// api/quiz/add/answers
function addQuiz(data, params) {
  return data.permission.shouldAuth().then(() => {
    if (!params || !params.length) return addQuizRequest(data);

    const type = params[0];
    switch (type) {
      case 'questions': return addQuizQuestionsRequest(data);
      case 'answers': return addQuizAnswersRequest(data);
      default: throw resp.error('route not found');
    }
  });
}

export default addQuiz;