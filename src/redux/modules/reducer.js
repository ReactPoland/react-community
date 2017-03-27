import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import auth from './auth';
import { reducer as form } from 'redux-form';
import info from './info';
import mapModule from './mapModule';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  info,
  map: mapModule
});
