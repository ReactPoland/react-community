import React, { Component } from 'react';
import RichTextEditor from '../../components/RichTextEditor';

export default class TextEditorPage extends Component {
  state = {
    showEditor: false
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showEditor: true });
    }, 3000);
  }

  render() {
    const showEditor = this.state.showEditor && __CLIENT__;
    const styles = require('./TextEditorPage.scss');

    return (
      <div className={styles.container}>
        {showEditor && <RichTextEditor />}
      </div>
    );
  }
}
