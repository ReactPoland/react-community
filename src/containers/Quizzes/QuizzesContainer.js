import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// STORE
import { loadQuizzes } from 'redux/modules/quizzesModule';
import { browserHistory } from 'react-router';
// COMPONENTS
import QuizWrap from './QuizWrap';
import QuizzesPage from './QuizzesPage';
import permission from 'utils/privileges';

import { showError } from 'redux/modules/errorsModule';

const mappedState = ({ quizzes, auth }) => ({
  list: quizzes.list,
  finishTests: quizzes.finishTests,
  loading: quizzes.loading,
  listLoaded: !!quizzes.list,
  permissions: permission(auth.user)
});

const mappedActions = {
  loadQuizzes,
  showError
};

@connect(mappedState, mappedActions)
class QuizzesContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    listLoaded: PropTypes.bool.isRequired,
    loadQuizzes: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    list: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    permissions: PropTypes.object.isRequired,
    finishTests: PropTypes.object
  }

  onSelectQuiz = quizId => ev => {
    ev.preventDefault();
    if (!this.props.permissions.isAuth) {
      return this.props.showError({
        requestName: 'start test',
        error: new Error('User not authorized')
      });
    }

    if (this.props.finishTests[quizId]) {
      return this.props.showError({
        requestName: 'start test',
        error: new Error('User was tested today')
      });
    }

    browserHistory.push(`quizzes/${quizId}`);
  }

  render() {
    return (
      <QuizWrap
        loaded={this.props.listLoaded}
        loadAction={this.props.loadQuizzes}
        refreshAction={this.props.loadQuizzes}
        loading={this.props.loading} >

        <QuizzesPage
          finishTests={this.props.finishTests}
          list={this.props.list}
          onSelectQuiz={this.onSelectQuiz} />
      </QuizWrap>
    );
  }
}

export default QuizzesContainer;
