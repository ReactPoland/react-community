import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import auth from './auth';
import { reducer as form } from 'redux-form';
import info from './info';
import mapModule from './mapModule';
import articlesModule from './articlesModule';
import practicesModule from './practicesModule';
import tutorialsModule from './tutorialsModule';
import conversationModule from './conversationModule';
import dialogModule from './dialogModule';
import usersModule from './usersModule';
import errorsModule from './errorsModule';
import eventsModule from './eventsModule';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  info,
  map: mapModule,
  practices: practicesModule,
  tutorials: tutorialsModule,
  articles: articlesModule,
  conversation: conversationModule,
  dialog: dialogModule,
  users: usersModule,
  errors: errorsModule,
  events: eventsModule
});
