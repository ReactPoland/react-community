import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import * as ct from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) replace('/');
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={ct.App}>
      { /* Home (main) route */ }
      <IndexRoute component={ct.HomePage} />

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" component={ct.LoginSuccess}/>
        <Route path="chat" component={ct.Chat} />
        <Route path="profile" name="ProfilePage" component={ct.ProfilePage} />
      </Route>

      { /* Routes */ }
      <Route path="world" component={ct.WorldPage} noFooter />
      <Route path="tutorials" component={ct.TutorialsPage} />
      <Route path="events" component={ct.EventsPage} />
      <Route path="best-practices" component={ct.BestPracticesPage} />

      <Route path="users">
        <IndexRoute component={ct.UsersPage} />
        <Route path="/user/:id" name="UserPage" component={ct.ProfilePage} />
      </Route>

      <Route path="articles" component={ct.ArticlesContainer}>
        <IndexRoute component={ct.ArticlesPage} />
        <Route path="/article/:id(/:slug)" component={ct.ArticlePage} />
        <Route path="add" component={ct.NewArticlePage} />
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={ct.NotFound} status={404} />
    </Route>
  );
};
