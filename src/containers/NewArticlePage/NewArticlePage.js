import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import { addArticle } from 'redux/modules/articlesModule';

import RichTextEditor from '../../components/RichTextEditor';

const mappedState = ({ articles }) => ({
  addingArticle: articles.addingArticle,
  articleAdded: articles.articleAdded,
  addArticleError: articles.addArticleError
});

const mappedActions = {
  addArticle
};

@connect(mappedState, mappedActions)
export default class NewArticlePage extends Component {
  static propTypes = {
    addingArticle: PropTypes.bool.isRequired,
    articleAdded: PropTypes.bool.isRequired,
    addArticleError: PropTypes.string.isRequired,
    addArticle: PropTypes.func.isRequired
  }

  state = {
    newArticle: {
      title: '',
      content: {
        'nodes': [
          {
            'kind': 'block',
            'type': 'paragraph',
            'nodes': [
              {
                'kind': 'text',
                'ranges': [
                  {
                    'text': 'New article...'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    validationErrors: {
      title: '',
      content: ''
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

  validateArticle = (articleData) => {
    const { title } = articleData;
    const validationErrors = {};

    if (!title) validationErrors.title = 'Title is required';
    // if (!content || !content.document.nodes.length) validationErrors.content = 'Content is required';

    this.setState({ validationErrors });

    return _isEmpty(validationErrors);
  }

  addArticle = () => {
    const newArticle = { ...this.state.newArticle };

    if (!this.validateArticle(newArticle)) {
      console.warn('INVALID ARTICLE', newArticle);
      return;
    }

    newArticle.content = JSON.stringify(newArticle.content);
    this.props.addArticle(newArticle);
  }

  render() {
    const { addingArticle } = this.props;
    const { newArticle: { title, content }, validationErrors } = this.state;
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
          />
          <RichTextEditor
            initialState={content}
            onChange={serializedState => { this.onChange('content', serializedState); }}
          />
          {validationErrors.content &&
            <p>{validationErrors.content}</p>}
          <FlatButton
            label={addingArticle ? 'Adding...' : 'Add article'}
            primary
            onClick={this.addArticle}
          />
        </Paper>
      </div>
    );
  }
}
