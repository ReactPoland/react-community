import React from 'react';
import PropTypes from 'prop-types';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import styles from './QuestionsPage.scss';

const QuestonBlock = ({ question, answers, onSelectAnswer }) => (
  <div>
    <h3>{question.question}</h3>
    {answers.map((answerItem, key) => {
      const inputName = `question_${question.id}`;
      const inputValue = `${inputName}_${answerItem.id}`;
      return (
        <div key={key}>
          <input
            onChange={onSelectAnswer(question.id, answerItem.id)}
            name={inputName}
            id={inputValue}
            type="radio" />
          <label htmlFor={inputValue}>{answerItem.answer}</label>
        </div>
      );
    })}
  </div>
);

const ResultQuestionBlock = ({ question, answers }) => (
  <div>
    <h3>{question.question}</h3>
    {answers.map((answerItem, key) => {
      const answerClass = [];
      if (answerItem.correct) answerClass.push(styles.correct);
      if (answerItem.checked) answerClass.push(styles.answered);
      return (
        <div className={answerClass.join(' ')} key={key}>{answerItem.answer}</div>
      );
    })}
  </div>
);

class QuestionPage extends React.Component {

  static propTypes = {
    list: PropTypes.array,
    finishList: PropTypes.object,
    onFinish: PropTypes.func.isRequired
  }

  state = { replies: [] }

  onSelectAnswer = (question, answerId) => () => {
    let replies = [ ...this.state.replies ];
    const questionIndex = replies.findIndex(item => item.question === question);


    if (questionIndex === -1) {
      replies.push({
        question,
        answers: [ answerId ]
      });
    } else {
      const newQuestion = {
        ...replies[questionIndex],
        answers: [answerId]
      };

      replies = [
        ...replies.slice(0, questionIndex),
        ...replies.slice(questionIndex + 1)
      ];

      replies.splice(questionIndex, 0, newQuestion);
    }

    this.setState({ replies });
  }

  onFinish = () => {
    this.props.onFinish(this.state.replies);
  }

  renderQuiz = (list) => {
    return list.map((question, key) => (
      <QuestonBlock
        onSelectAnswer={this.onSelectAnswer}
        key={key}
        question={{
          id: question.id,
          question: question.question
        }}
        answers={question.answers} />
    ));
  }

  renderResults = (list) => {
    return list.map((resultQuestion, key) => (
      <ResultQuestionBlock
        key={key}
        question={{
          id: resultQuestion.id,
          question: resultQuestion.question
        }}
        answers={resultQuestion.answers} />
    ));
  }

  render() {
    const { list, finishList } = this.props;

    return (
      <div className="container">
        <Jumbotron>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Jumbotron>
        { !!finishList
          ? this.renderResults(finishList.answers)
          : this.renderQuiz(list) }
        {!finishList && (
          <button onClick={this.onFinish}>Finish</button>
        ) }
      </div>
    );
  }
}

export default QuestionPage;
