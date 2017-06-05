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

const mappedState = ({ articles }) => ({
  addingArticle: articles.addingArticle
});

const mappedActions = { addArticle };

@connect(mappedState, mappedActions)
export default class NewArticlePage extends Component {
  static propTypes = {
    addingArticle: PropTypes.bool.isRequired,
    addArticle: PropTypes.func.isRequired
  };

  state = {
    newArticle: {
      type: 'own',
      title: slate.textToState('Title...'),
      description: slate.textToState('Description...'),
      link: slate.textToState('http://'),
      content: slate.textToState('Content...'),
      coverImageUrl: slate.textToState('Image URL'),
      previewSize: [1, 1]
    },
    validationErrors: {
      title: '',
      description: '',
      content: '',
      coverImageUrl: ''
    }
  };

  // Updates state of the article
  change = property => value => {
    const newState = { ...this.state };

    newState.newArticle[property] = value;
    // Hide existing validation error
    if (newState.validationErrors[property] && value) {
      newState.validationErrors[property] = '';
    }

    this.setState(newState);
  };

  // TODO: probably move to to 'utils'? Since it's also used in ArticlePage
  validateArticle = articleData => {
    const { title, description, content, coverImageUrl } = articleData;
    const validationErrors = {};

    if (!title) validationErrors.title = 'Title is required';
    if (!description) validationErrors.description = 'Description is required';
    if (!content) validationErrors.content = 'Content is required';
    if (!coverImageUrl) validationErrors.coverImageUrl = 'Cover image is required';

    this.setState({ validationErrors });

    return _isEmpty(validationErrors);
  };

  addArticle = () => {
    const newArticle = { ...this.state.newArticle };

    if (!this.validateArticle(newArticle)) return;

    newArticle.content = slate.stateToObject(this.state.newArticle.content);
    newArticle.plainText = slate.stateToText(this.state.newArticle.content);
    newArticle.description = slate.stateToText(this.state.newArticle.description);
    newArticle.title = slate.stateToText(this.state.newArticle.title);
    newArticle.link = slate.stateToText(this.state.newArticle.link);
    newArticle.coverImageUrl = slate.stateToText(this.state.newArticle.coverImageUrl);

    this.props.addArticle(newArticle);
  };

  render() {
    const { addingArticle } = this.props;
    const {
      newArticle: { type, title, description, content, link, coverImageUrl, previewSize },
      validationErrors
    } = this.state;

    return (
      <Div height="100%">
        <Grid>
          <Row>
            <Col xs={12}>
              <TypeSelectButtons type={type} onChange={this.change('type')} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Paper className={styles.articleEditor} zDepth={2}>
                <h3 className={styles.articleTitle}>
                  <PlainTextEditor
                    state={title}
                    onChange={this.change('title')}
                    placeholder="Title"
                  />
                </h3>
                <div className={styles.articleDescription}>
                  <PlainTextEditor
                    state={description}
                    onChange={this.change('description')}
                    placeholder="Description"
                  />
                </div>
                <div>
                  <PlainTextEditor
                    state={coverImageUrl}
                    onChange={this.change('coverImageUrl')}
                    placeholder="Cover image URL"
                  />
                </div>
                {type === 'external' &&
                  <div className={styles.articleLink}>
                    <PlainTextEditor
                      state={link}
                      onChange={this.change('link')}
                      placeholder="Link"
                    />
                  </div>}
                {validationErrors.title && <p>{validationErrors.title}</p>}
                {type === 'own' &&
                  <RichTextEditor
                    state={content}
                    style={{
                      width: '100%',
                      height: '100vh',
                      maxHeight: '45vh'
                    }}
                    onChange={this.change('content')}
                    placeholder="Content"
                  />}
                {validationErrors.content && <p>{validationErrors.content}</p>}
                <div className={styles.previewSizeInputs}>
                  <div>
                    <span>Width:</span>
                    <input type="number" value={previewSize[0]} />
                  </div>
                  <div>
                    <span>Height:</span>
                    <input type="number" value={previewSize[1]} />
                  </div>
                </div>
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
