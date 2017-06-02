import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import permission from 'utils/privileges';
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

  // Redirects new user's to their profile page
  const checkUserProfileStatus = (nextState, replace, cb) => {
    const { user } = store.getState().auth;
    // Check if user has finished registration and we're not on "/profile" already
    if (user && !user.filledProfile && nextState.location.pathname !== '/profile') {
      replace('/profile');
    }
    cb();
  };

  // Redirect when user role is different than staff
  const checkStaff = (nextState, replace, cb) => {
    const { user } = store.getState().auth;
    const isStaff = permission(user).isStaff;
    if (!isStaff) {
      replace('/');
    }
    cb();
  };

  const onlyUnauthorized = (nextState, replace, cb) => {
    const { user } = store.getState().auth;
    const { isAuth } = permission(user);
    if (isAuth) replace('/profile');
    cb();
  };

  return (
    <Route path="/" component={ct.App} onEnter={checkUserProfileStatus}>
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
      <Route path="login" component={ct.Login} onEnter={onlyUnauthorized} />
      <Route path="tutorials" component={ct.TutorialsContainer}>
        <IndexRoute component={ct.TutorialsPage} />
        <Route path="add" component={ct.NewTutorialPage} />
        <Route path="/tutorial/:id" component={ct.TutorialPreview} />
      </Route>
      <Route path="events" component={ct.EventsPage} />
      <Route path="best-practices" component={ct.BestPracticesContainer}>
        <IndexRoute component={ct.BestPracticesPage} />
        <Route path="/best-practice/:id" component={ct.BestPracticesPreview} />
        <Route path="add" onEnter={checkStaff} component={ct.NewPracticePage} />
      </Route>

      <Route path="quizzes" component={ct.QuizzesContainer} />
      <Route path="quizzes/:id" component={ct.QuestionsContainer} />

      <Route path="users">
        <IndexRoute component={ct.UsersPage} />
        <Route path="/user/:id" name="UserPage" component={ct.ProfilePage} />
      </Route>

      <Route path="articles" component={ct.ArticlesContainer}>
        <IndexRoute component={ct.ArticlesPage} onEnter={checkStaff} />
        <Route path="/article/:id(/:slug)" component={ct.ArticlePage} />
        <Route path="add" onEnter={checkStaff} component={ct.NewArticlePage} />
      </Route>

      { /* Catches remaining routes */ }
      <Route path="*" component={ct.NotFound} status={404} />
    </Route>
  );
};
