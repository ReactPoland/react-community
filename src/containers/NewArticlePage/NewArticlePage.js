import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
// STORE
import { addArticle } from 'redux/modules/articlesModule';
// COMPONENTS
import { PlainTextEditor, RichTextEditor } from 'components';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

const mappedState = ({ articles }) => ({
  addingArticle: articles.addingArticle
});

const mappedActions = { addArticle };

@connect(mappedState, mappedActions)
export default class NewArticlePage extends Component {
  static propTypes = {
    addingArticle: PropTypes.bool.isRequired,
    addArticle: PropTypes.func.isRequired
  }

  state = {
    newArticle: {
      title: 'Title',
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
                    'text': 'Content...'
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

    if (!this.validateArticle(newArticle)) return;

    newArticle.content = JSON.stringify(newArticle.content);
    this.props.addArticle(newArticle);
  }

  render() {
    const { addingArticle } = this.props;
    const { newArticle: { title, content }, validationErrors } = this.state;
    const styles = require('./NewArticlePage.scss');

    return (
      <div className={styles.container}>
        <Grid>
          <Row>
            <Col xs={12}>
              <Paper className={styles.editor} zDepth={2}>
                <h2>
                  <PlainTextEditor
                    initialState={title}
                    onChange={val => { this.onChange('title', val); }}
                  />
                </h2>
                {validationErrors.title &&
                  <p>{validationErrors.title}</p>}
                <RichTextEditor
                  initialState={content}
                  style={{
                    width: '100%',
                    height: '100vh',
                    maxHeight: '45vh',
                  }}
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
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
