import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// STORE
import { loadQuizzes } from 'redux/modules/quizzesModule';
// COMPONENTS
import QuizWrap from './QuizWrap';
import QuizzesPage from './QuizzesPage';

const mappedState = ({ quizzes }) => ({
  list: quizzes.list,
  loading: quizzes.loading,
  listLoaded: !!quizzes.list
});

const mappedActions = { loadQuizzes };

@connect(mappedState, mappedActions)
class QuizzesContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    listLoaded: PropTypes.bool.isRequired,
    loadQuizzes: PropTypes.func.isRequired,
    list: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  }

  render() {
    return (
      <QuizWrap
        loaded={this.props.listLoaded}
        loadAction={this.props.loadQuizzes}
        refreshAction={this.props.loadQuizzes}
        loading={this.props.loading} >

        <QuizzesPage list={this.props.list} />
      </QuizWrap>
    );
  }
}

export default QuizzesContainer;
