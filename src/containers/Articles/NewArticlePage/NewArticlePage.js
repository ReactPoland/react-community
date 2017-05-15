import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import { slate } from 'utils';
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
import styles from './NewArticlePage.scss';

const mappedState = ({ articles }) => ({ addingArticle: articles.addingArticle });

const mappedActions = { addArticle };

@connect(mappedState, mappedActions)
export default class NewArticlePage extends Component {
  static propTypes = {
    addingArticle: PropTypes.bool.isRequired,
    addArticle: PropTypes.func.isRequired
  }

  state = {
    newArticle: {
      type: 'own',
      title: slate.textToState('Title...'),
      description: slate.textToState('Description...'),
      link: slate.textToState('http://'),
      content: slate.textToState('Content...')
    },
    validationErrors: {
      title: '',
      description: '',
      content: ''
    }
  }

  // Updates state of the article
  change = (property) => (value) => {
    const newState = { ...this.state };

    newState.newArticle[property] = value;
    // Hide existing validation error
    if (newState.validationErrors[property] && value) {
      newState.validationErrors[property] = '';
    }

    this.setState(newState);
  }

  // TODO: probably move to to 'utils'? SInce it's also used in ArticlePage
  validateArticle = (articleData) => {
    const { title, description, content } = articleData;
    const validationErrors = {};

    if (!title) validationErrors.title = 'Title is required';
    if (!description) validationErrors.description = 'Description is required';
    if (!content) validationErrors.content = 'Content is required';

    this.setState({ validationErrors });

    return _isEmpty(validationErrors);
  }

  addArticle = () => {
    const newArticle = { ...this.state.newArticle };

    if (!this.validateArticle(newArticle)) return;

    newArticle.content = slate.stateToObject(this.state.newArticle.content);
    newArticle.plainText = slate.stateToText(this.state.newArticle.content);
    newArticle.description = slate.stateToText(this.state.newArticle.description);
    newArticle.title = slate.stateToText(this.state.newArticle.title);
    newArticle.link = slate.stateToText(this.state.newArticle.link);

    this.props.addArticle(newArticle);
  }

  render() {
    const { addingArticle } = this.props;
    const { newArticle: { type, title, description, content, link }, validationErrors } = this.state;

    console.log('xxx', this.state.newArticle);

    return (
      <Div height="100%">
        <Grid>
          <Row>
            <Col xs={12}>
              <TypeSelectButtons
                type={type}
                onChange={this.change('type')}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Paper className={styles.articleEditor} zDepth={2}>
                <h3 className={styles.articleTitle}>
                  <PlainTextEditor
                    initialState={title}
                    onChange={this.change('title')}
                  />
                </h3>
                <div className={styles.articleDescription}>
                  <PlainTextEditor
                    initialState={description}
                    onChange={this.change('description')}
                  />
                </div>
                {type === 'external' && <div className={styles.articleLink}>
                  <PlainTextEditor
                    initialState={link}
                    onChange={this.change('link')}
                  />
                </div>}
                {validationErrors.title && <p>{validationErrors.title}</p>}
                {type === 'own' && <RichTextEditor
                  initialState={content}
                  style={{ width: '100%', height: '100vh', maxHeight: '45vh' }}
                  onChange={this.change('content')}
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
