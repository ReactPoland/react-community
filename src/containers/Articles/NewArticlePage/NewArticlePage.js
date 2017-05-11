import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
// STORE
import { addArticle } from 'redux/modules/articlesModule';
// COMPONENTS
import { PlainTextEditor, RichTextEditor } from 'components';
import TypeSelectButtons from './TypeSelectButtons';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Div } from 'components/styled';

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
      type: 'own', // TODO: check if name is proper
      title: 'Title...',
      description: 'Description...',
      link: 'Link...',
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

    console.warn('newArticle', newArticle);

    // this.props.addArticle(newArticle);
  }

  render() {
    const { addingArticle } = this.props;
    const { newArticle: { type, title, description, content, link }, validationErrors } = this.state;
    const styles = require('./NewArticlePage.scss');

    return (
      <Div height="100%">
        <Grid>
          <Row>
            <Col xs={12}>
              <TypeSelectButtons
                type={type}
                onChange={val => { this.onChange('type', val); }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Paper className={styles.articleEditor} zDepth={2}>
                <h3 className={styles.articleTitle}>
                  <PlainTextEditor
                    initialState={title}
                    onChange={val => { this.onChange('title', val); }}
                  />
                </h3>
                <div className={styles.articleDescription}>
                  <PlainTextEditor
                    initialState={description}
                    onChange={val => { this.onChange('description', val); }}
                  />
                </div>
                {type === 'external' && <div className={styles.articleLink}>
                  <PlainTextEditor
                    initialState={link}
                    onChange={val => { this.onChange('link', val); }}
                  />
                </div>}
                {validationErrors.title && <p>{validationErrors.title}</p>}
                {type === 'own' && <RichTextEditor
                  initialState={content}
                  style={{
                    width: '100%',
                    height: '100vh',
                    maxHeight: '45vh',
                  }}
                  onChange={val => { this.onChange('content', val); }}
                />}
                {validationErrors.content && <p>{validationErrors.content}</p>}
                <FlatButton
                  label={addingArticle ? 'Adding...' : 'Add article'}
                  primary
                  onClick={this.addArticle}
                />
              </Paper>
            </Col>
          </Row>
        </Grid>
      </Div>
    );
  }
}
