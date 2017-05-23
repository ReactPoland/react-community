import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

const QuestonBlock = ({ question, answers }) => (
  <div>
    <div>{question.question}</div>
    {answers.map((answerItem, key) => {
      const inputName = `question_${question.id}`;
      const inputValue = `${inputName}_${answerItem.id}`;
      return (
        <div key={key}>
          <input
            name={inputName}
            id={inputValue}
            type="radio" />
          <label htmlFor={inputValue}>{answerItem.answer}</label>
        </div>
      );
    })}
  </div>
);

const fakeQuestions = [{
  id: '123',
  question: 'test Question',
  answers: [{
    id: '1',
    answer: 'answ 1'
  }, {
    id: '2',
    answer: 'answ 2'
  }, {
    id: '3',
    answer: 'answ 3'
  }]
}, {
  id: '124',
  question: 'test Question2',
  answers: [{
    id: '4',
    answer: 'answ 1'
  }, {
    id: '5',
    answer: 'answ 2'
  }, {
    id: '6',
    answer: 'answ 3'
  }]
}];

export default function QuestionPage() {
  return (
    <div className="container">
      <Jumbotron>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </Jumbotron>
      {fakeQuestions.map((fakeQuestion, key) => (
        <QuestonBlock
          key={key}
          question={{
            id: fakeQuestion.id,
            question: fakeQuestion.question
          }}
          answers={fakeQuestion.answers} />
      ))}
    </div>
  );
}
