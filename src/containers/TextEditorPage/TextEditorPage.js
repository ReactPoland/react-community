import React, { Component } from 'react';
import TextEditor from './TextEditor';

export default class TextEditorPage extends Component {
  state = {
    showEditor: false
  }

  componentDidMount() {
    console.warn('didMount');
    setTimeout(() => {
      console.warn('didMount timeout');
      this.setState({ showEditor: true });
    }, 3000);
  }

  render() {
    const showEditor = this.state.showEditor && __CLIENT__;
    const styles = require('./TextEditorPage.scss');

    return (
      <div className={styles.container}>
        {showEditor && <TextEditor />}
      </div>
    );
  }
}
