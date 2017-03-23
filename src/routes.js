import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Chat,
    Login,
    LoginSuccess,
    World,
    NotFound,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */

  // ⬆️ Why, is there a reason for keeping them in that order? 🤔

  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" component={LoginSuccess}/>
        <Route path="chat" component={Chat} />
      </Route>

      { /* Routes */ }
      <Route path="login" component={Login} />
      <Route path="world" component={World} />

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
