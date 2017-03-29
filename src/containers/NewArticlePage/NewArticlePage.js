import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import RichTextEditor from '../../components/RichTextEditor';

export default class NewArticlePage extends Component {
  state = {
    newArticle: {
      title: '',
      dateCreated: '',
      content: {}
    },
    validationErrors: {
      title: ''
    }
  }

  // Updates state of the article
  onChange = (property, value) => {
    const newState = { ...this.state };

    newState.newArticle[property] = value;
    // Hide existing validation error
    if (newState.validationErrors[property] && value) {
      newState.validationErrors[property] = '';
    }

    this.setState(newState);
  }

  render() {
    const { newArticle: { title }, validationErrors } = this.state;
    const styles = require('./NewArticlePage.scss');

    return (
      <div className={styles.container}>
        <Paper className={styles.editor} zDepth={2}>
          <h2>New article</h2>
          <TextField
            floatingLabelText="Title"
            value={title}
            errorText={validationErrors.title}
            onChange={ev => { this.onChange('title', ev.target.value); }}
            fullWidth
            autoFocus
          />
          <RichTextEditor
            onChange={ev => { this.onChange('content', ev.target.value); }}
          />
          <FlatButton label="Add article" primary />
        </Paper>
      </div>
    );
  }
}
