import removeQuizRequest from './removeQuiz';
import removeQuizQuestionsRequest from './removeQuizQuestions';
import removeQuizAnswersRequest from './removeQuizAnswers';
import resp from '../../../utils/serverResp';

// api/quiz/remove
// api/quiz/remove/questions
// api/quiz/remove/answers
function removeQuiz(data, params) {
  return data.permission.shouldAuth().then(() => {
    if (!params || !params.length) return removeQuizRequest(data);

    const type = params[0];
    switch (type) {
      case 'questions': return removeQuizQuestionsRequest(data);
      case 'answers': return removeQuizAnswersRequest(data);
      default: throw resp.error('route not found');
    }
  });
}

export default removeQuiz;
