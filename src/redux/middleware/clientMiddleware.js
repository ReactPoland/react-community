import { showError } from 'redux/modules/errorsModule';

export default client => store => next => action => {
  const { dispatch, getState } = store;

  if (typeof action === 'function') return action(dispatch, getState);

  const { promise, types, requestName, ...rest } = action;

  if (!promise) return next(action);

  const [REQUEST, SUCCESS, FAILURE] = types;

  next({ ...rest, type: REQUEST });

  const actionPromise = promise(client);

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
