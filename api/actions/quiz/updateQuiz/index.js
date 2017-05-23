import updateQuizRequest from './updateQuiz';
import updateQuizQuestionsRequest from './updateQuizQuestions';
import updateQuizAnswersRequest from './updateQuizAnswers';
import resp from '../../../utils/serverResp';

// api/quiz/update
// api/quiz/update/questions
// api/quiz/update/answers
function updateQuiz(data, params) {
  return data.permission.onlyStaff().then(() => {
    if (!params || !params.length) return updateQuizRequest(data);

    const type = params[0];
    switch (type) {
      case 'questions': return updateQuizQuestionsRequest(data);
      case 'answers': return updateQuizAnswersRequest(data);
      default: throw resp.error('route not found');
    }
  });
}

export default updateQuiz;
