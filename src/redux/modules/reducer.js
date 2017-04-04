import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import auth from './auth';
import { reducer as form } from 'redux-form';
import info from './info';
import mapModule from './mapModule';
import articlesModule from './articlesModule';
import conversationModule from './conversationModule';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  info,
  map: mapModule,
  articles: articlesModule,
  conversation: conversationModule
});
