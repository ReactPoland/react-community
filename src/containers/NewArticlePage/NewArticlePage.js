import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
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
      </div>
    );
  }
}
