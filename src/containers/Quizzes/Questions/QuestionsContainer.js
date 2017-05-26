import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// STORE
import { startQuiz, finishQuiz } from 'redux/modules/quizzesModule';
// COMPONENTS
import QuizWrap from '../QuizWrap';
import QuestionsPage from './QuestionsPage';

const mappedState = ({ quizzes }) => ({
  tests: quizzes.tests,
  finishTests: quizzes.finishTests,
  loading: quizzes.loading,
});

const mappedActions = { startQuiz, finishQuiz };

@connect(mappedState, mappedActions)
class QuizzesContainer extends Component {
  static propTypes = {
    startQuiz: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    finishQuiz: PropTypes.func.isRequired,
    tests: PropTypes.object.isRequired,
    finishTests: PropTypes.object.isRequired
  }

  onFinishHandler = (replies) => {
    this.props.finishQuiz({
      quizId: this.props.params.id,
      replies
    });
  }

  getCurrentTest = () => this.props.tests[this.props.params.id]

  getCurrentFinishTest = () => this.props.finishTests[this.props.params.id]

  fetchQuiz = () => {
    this.props.startQuiz(this.props.params.id);
  }

  isLoaded = () => !!this.getCurrentTest()

  render() {
    return (
      <QuizWrap
        loaded={this.isLoaded()}
        loadAction={this.fetchQuiz}
        refreshAction={this.fetchQuiz}
        loading={this.props.loading} >

        <QuestionsPage
          list={this.getCurrentTest()}
          finishList={this.getCurrentFinishTest()}
          onFinish={this.onFinishHandler}
          />
      </QuizWrap>
    );
  }
}

export default QuizzesContainer;
