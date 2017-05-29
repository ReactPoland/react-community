// import _sample from 'lodash/sample';
import ApiClient from 'helpers/ApiClient';
import { showError } from 'redux/modules/errorsModule';
import { load } from 'redux/modules/auth';
// --- ACTION TYPES ---
// LOAD
const LOAD_QUIZZES_REQUEST = 'LOAD_QUIZZES_REQUEST';
const LOAD_QUIZZES_SUCCESS = 'LOAD_QUIZZES_SUCCESS';
const LOAD_QUIZZES_FAIL = 'LOAD_QUIZZES_FAIL';

const LOAD_TEST_QUIZ_SUCCESS = 'LOAD_TEST_QUIZ_SUCCESS';
const LOAD_TEST_QUIZ_FAIL = 'LOAD_TEST_QUIZ_FAIL';

const FINISH_TEST_QUIZ_SUCCESS = 'FINISH_TEST_QUIZ_SUCCESS';
const FINISH_TEST_QUIZ_FAIL = 'FINISH_TEST_QUIZ_FAIL';

const initialState = {
  list: null,
  loading: false,
  tests: {},
  finishTests: {}
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
      dispatch(load());
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

// --- REDUCER ---
export default function articlesModule(state = initialState, action = {}) {
  switch (action.type) {
    // LOAD
    case LOAD_QUIZZES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOAD_QUIZZES_SUCCESS:
      const finishTests = state.finishTests;
      action.result.message.map(quizItem => {
        if (quizItem.quizStats && quizItem.quizStats.length) {
          finishTests[quizItem.id] = quizItem.quizStats[0];
        }
      });

      return {
        ...state,
        list: action.result.message,
        loading: false,
        finishTests
      };
    case LOAD_QUIZZES_FAIL:
      return {
        ...state,
        loading: false,
        list: null // list: [] -> don't load after fail
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
