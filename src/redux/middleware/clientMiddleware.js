import { showError } from 'redux/modules/errorsModule';

const randomErrors = false; // Displays errors at random

export default client => store => next => action => {
  const { dispatch, getState } = store;

  if (typeof action === 'function') return action(dispatch, getState);

  const { promise, types, requestName, ...rest } = action;

  if (!promise) return next(action);

  const [REQUEST, SUCCESS, FAILURE] = types;

  next({ ...rest, type: REQUEST });

  const actionPromise = promise(client);

  // --- DEV ---
  // Returns error at random, used for testing
  if (randomErrors && requestName && Math.random() < 0.1) {
    const error = { status: 123, message: 'RANDOM TEST ERROR 😡' };
    next({ ...rest, error, type: FAILURE });
    dispatch(showError({ requestName, error }));
    return false;
  }
  // -----------

  actionPromise.then(
    (result) => next({ ...rest, result, type: SUCCESS }),
    (error) => {
      next({ ...rest, error, type: FAILURE });
      // Catch error and save it in the store
      dispatch(showError({ requestName, error }));
    }
  ).catch((error) => {
    next({ ...rest, error, type: FAILURE });
    // Catch error and save it in the store
    dispatch(showError({ requestName, error }));
  });

  return actionPromise;
};
