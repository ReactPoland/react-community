import moment from 'moment';
import _reject from 'lodash/reject';
import _startsWith from 'lodash/startsWith';

export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';
export const HIDE_ALL_ERRORS = 'HIDE_ALL_ERRORS';
export const HIDE_ERRORS_OF_TYPE = 'HIDE_ERRORS_OF_TYPE';

export const errorsModule = (state = [], action = {}) => {
  switch (action.type) {
    case SHOW_ERROR:
      return [...state, action.payload.error];
    case HIDE_ERROR:
      const newState = [...state];
      newState.shift();
      return newState;
    case HIDE_ALL_ERRORS:
      return [];
    case HIDE_ERRORS_OF_TYPE:
      return _reject(state, error => _startsWith(error.type, action.payload.errorType));
    default:
      return state;
  }
};

export const composeError = error => ({ type: 'generic', time: moment(), message: '', ...error });
export const showError = error => ({ type: SHOW_ERROR, payload: { error: composeError(error) } });
export const hideErrorsOfType = errorType => ({ type: HIDE_ERRORS_OF_TYPE, payload: { errorType } });
export const hideError = () => ({ type: HIDE_ERROR });
export const hideAllErrors = () => ({ type: HIDE_ALL_ERRORS });
