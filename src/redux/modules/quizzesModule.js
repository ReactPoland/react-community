// import _sample from 'lodash/sample';
import ApiClient from 'helpers/ApiClient';
import { showError } from 'redux/modules/errorsModule';

// const debug = false;

// --- ACTION TYPES ---
// LOAD
const LOAD_QUIZZES_REQUEST = 'LOAD_QUIZZES_REQUEST';
const LOAD_QUIZZES_SUCCESS = 'LOAD_QUIZZES_SUCCESS';
const LOAD_QUIZZES_FAIL = 'LOAD_QUIZZES_FAIL';

const LOAD_TEST_QUIZ_SUCCESS = 'LOAD_TEST_QUIZ_SUCCESS';
const LOAD_TEST_QUIZ_FAIL = 'LOAD_TEST_QUIZ_FAIL';

const FINISH_TEST_QUIZ_SUCCESS = 'FINISH_TEST_QUIZ_SUCCESS';
const FINISH_TEST_QUIZ_FAIL = 'FINISH_TEST_QUIZ_FAIL';
// ADD
// const ADD_ARTICLE_REQUEST = 'ADD_ARTICLE_REQUEST';
// const ADD_ARTICLE_SUCCESS = 'ADD_ARTICLE_SUCCESS';
// const ADD_ARTICLE_FAIL = 'ADD_ARTICLE_FAIL';
// EDIT
// const EDIT_ARTICLE_REQUEST = 'EDIT_ARTICLE_REQUEST';
// const EDIT_ARTICLE_SUCCESS = 'EDIT_ARTICLE_SUCCESS';
// const EDIT_ARTICLE_FAIL = 'EDIT_ARTICLE_FAIL';
// REMOVE
// const REMOVE_ARTICLE_REQUEST = 'REMOVE_ARTICLE_REQUEST';
// const REMOVE_ARTICLE_SUCCESS = 'REMOVE_ARTICLE_SUCCESS';
// const REMOVE_ARTICLE_FAIL = 'REMOVE_ARTICLE_FAIL';

// --- HELPERS ---

// Makes sure that the rich editor alwasy get's object as a content
// const prepareContent = (jsonString) => {
//   if (typeof jsonString === 'object') return jsonString;
//
//   try {
//     const obj = JSON.parse(jsonString);
//     if (obj && typeof obj === 'object') return obj;
//   } catch (error) {
//     if (debug) console.warn('ERROR: string cannot be parsed as JSON:', error);
//     return {
//       kind: 'state',
//       document: {
//         data: {},
//         kind: 'document',
//         nodes: [
//           {
//             kind: 'block',
//             type: 'paragraph',
//             nodes: [{ kind: 'text', ranges: [{ text: `${jsonString}` }] }]
//           }
//         ]
//       }
//     };
//   }
// };

const initialState = {
  // Loading all articles
  list: null,
  loading: false,
  tests: {},
  finishTests: {}
  // articlesLoaded: false,
  // loadArticlesError: false,
  // Adding new article
  // articleAdded: null, // (Number) ID of an article that was just added
  // addArticleError: false,
  // Editing article
  // articleEdited: false,
  // editArticleError: false,
  // Removing a article
  // articleRemoved: false,
  // removeArticleError: false
};

// --- ACTIONS ---
// LOAD
export const loadQuizzes = () => ({
  requestName: 'Load quizzes',
  types: [LOAD_QUIZZES_REQUEST, LOAD_QUIZZES_SUCCESS, LOAD_QUIZZES_FAIL],
  promise: (client) => client.get('/quiz/load')
});

export const startQuiz = (quizId) => ({
  requestName: 'Load test',
  payload: { quizId },
  types: [LOAD_QUIZZES_REQUEST, LOAD_TEST_QUIZ_SUCCESS, LOAD_TEST_QUIZ_FAIL],
  promise: (client) => client.post('/quiz/startTest', { data: { quizId } })
});

// export const finishQuiz = (data) => ({
//   requestName: 'Finish test',
//   payload: { quizId: data.quizId },
//   types: [LOAD_QUIZZES_REQUEST, FINISH_TEST_QUIZ_SUCCESS, FINISH_TEST_QUIZ_FAIL],
//   promise: (client) => client.post('/quiz/finishTest', { data })
// });

export const finishQuiz = (data) => {
  return async (dispatch) => {
    dispatch({
      type: LOAD_QUIZZES_REQUEST
    });

    const client = new ApiClient();

    try {
      const finishTestResponse = await client
        .post('/quiz/finishTest', { data });

      // TODO: update profile stats
      // TODO: set last stats on the quizzes thumbnail
      dispatch({
        type: FINISH_TEST_QUIZ_SUCCESS,
        result: finishTestResponse,
        payload: { quizId: data.quizId }
      });
    } catch (error) {
      dispatch(showError({
        requestName: 'finish test',
        error
      }));
    }
  };
};

// ADD
// export const addArticle = (article) => ({
//   requestName: 'Add article',
//   types: [ADD_ARTICLE_REQUEST, ADD_ARTICLE_SUCCESS, ADD_ARTICLE_FAIL],
//   promise: (client) => client.post('/article/addArticle', { data: article })
// });
//
// // EDIT
// export const editArticle = (article) => ({
//   requestName: 'Edit article',
//   types: [EDIT_ARTICLE_REQUEST, EDIT_ARTICLE_SUCCESS, EDIT_ARTICLE_FAIL],
//   payload: { articleId: article.id, article },
//   promise: client => client.post('/article/updateArticle', { data: { ...article, content: article.content } })
// });
//
// // REMOVE
// export const removeArticle = (articleId) => ({
//   requestName: 'Remove article',
//   types: [REMOVE_ARTICLE_REQUEST, REMOVE_ARTICLE_SUCCESS, REMOVE_ARTICLE_FAIL],
//   payload: { articleId },
//   promise: (client) => client.post('/article/removeArticle', { data: { id: articleId } })
// });

// --- REDUCER ---
export default function articlesModule(state = initialState, action = {}) {
  switch (action.type) {
    // LOAD
    case LOAD_QUIZZES_REQUEST:
      return {
        ...state,
        loading: true
        // loadingArticles: true,
        // loadArticlesError: false
      };
    case LOAD_QUIZZES_SUCCESS:
      // const all = action.result.message.map(article => ({
        // ...article,
        // size: _sample([6, 12]), // TODO: this will be set on the page, and should be stored in the DB
        // content: prepareContent(article.content)
      // }));
      return {
        ...state,
        list: action.result.message,
        loading: false
        // all: all,
        // loadingArticles: false,
        // articlesLoaded: true
      };
    case LOAD_QUIZZES_FAIL:
      return {
        ...state,
        loading: false,
        list: null // list: [] -> don't load after fail
        // loadingArticles: false,
        // articlesLoaded: false,
        // loadArticlesError: true
      };
    case LOAD_TEST_QUIZ_SUCCESS:
      return {
        ...state,
        tests: {
          ...state.tests,
          [action.payload.quizId]: action.result.message
        },
        loading: false
      };
    case LOAD_TEST_QUIZ_FAIL:
      return {
        ...state,
        tests: {
          ...state.tests,
          [action.payload.quizId]: undefined
        },
        loading: false
      };
    case FINISH_TEST_QUIZ_SUCCESS:
      return {
        ...state,
        finishTests: {
          ...state.tests,
          [action.payload.quizId]: action.result.message
        },
        loading: false
      };
    case FINISH_TEST_QUIZ_FAIL:
      return {
        ...state,
        finishTests: {
          ...state.tests,
          [action.payload.quizId]: undefined
        },
        loading: false
      };
    default:
      return state;
  }
}
