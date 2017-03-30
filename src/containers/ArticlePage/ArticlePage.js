import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
// STORE
import { editArticle } from 'redux/modules/articlesModule';
// COMPONENTS
import { PlainTextEditor, RichTextEditor } from 'components';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FlatButton from 'material-ui/FlatButton';
import { ArticleHeader, List } from 'components/styled';

const mappedState = ({ articles }, props) => ({
  article: _find(articles.all, art => props.params.id === `${art.id}`),
  editingArticle: articles.editingArticle,
  articleEdited: articles.articleEdited,
  editArticleError: articles.editArticleError
});

const mappedActions = { editArticle };

@connect(mappedState, mappedActions)
export default class ArticlePage extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    editingArticle: PropTypes.bool.isRequired,
    articleEdited: PropTypes.bool.isRequired,
    editArticleError: PropTypes.string.isRequired,
    editArticle: PropTypes.func.isRequired
  }

  state = {
    editingMode: false,
    editedContent: '',
    editedTitle: ''
  }

  componentWillReceiveProps(nextProps) {
    // When article was successfully updated...
    if (nextProps.articleEdited !== this.props.articleEdited) {
      this.setState({
        editingMode: false,
        editedContent: '',
        editedTitle: ''
      });
    }
  }

  editTitle = (editedTitle) => {
    this.setState({ editedTitle });
  }

  editContent = (serializedState) => {
    this.setState({ editedContent: serializedState });
  }

  toggleEditMode = () => {
    this.setState({
      editingMode: !this.state.editingMode,
      editedContent: this.state.editingMode ? '' : '',
      editedTitle: this.state.editingMode ? '' : ''
    });
  }

  validateArticle = (articleData) => {
    const { title } = articleData;
    const validationErrors = {};

    if (!title) validationErrors.title = 'Title is required';
    // if (!content || !content.document.nodes.length) validationErrors.content = 'Content is required';

    this.setState({ validationErrors });

    return _isEmpty(validationErrors);
  }

  saveEdits = () => {
    const { article } = this.props;

    const editedArticle = {
      id: article.id,
      title: this.state.editedTitle || article.title,
      content: (this.state.editedContent && JSON.stringify(this.state.editedContent)) || article.content
    };

    if (!this.validateArticle(editedArticle)) {
      // TODO: display error message on the page
      console.error('INVALID ARTICLE', editedArticle);
      return;
    }

    this.props.editArticle(editedArticle);
  }

  cancelEditing = () => {
    this.setState({
      editingMode: false,
      editedContent: '',
      editedTitle: ''
    });
  }

  renderTitle = () => {
    const { article } = this.props;

    return (
      <h1 style={{ margin: 0 }}>
        {
          this.state.editingMode
          ? <PlainTextEditor initialState={this.state.editedTitle || article.title} onChange={this.editTitle} />
          : article.title
        }
      </h1>
    );
  }

  renderEditor = (articleContent) => {
    return (
      <RichTextEditor
        initialState={JSON.parse(articleContent)}
        style={{ width: '100%' }}
        readOnly={!this.state.editingMode}
        onChange={this.editContent}
      />
    );
  }

  renderEditButton = () => {
    const { editingMode } = this.state;

    return (
      <FlatButton
        label={editingMode ? 'Cancel' : 'Edit'}
        primary={!editingMode}
        secondary={editingMode}
        onTouchTap={editingMode ? this.cancelEditing : this.toggleEditMode}
      />
    );
  }

  renderSaveButton = () => {
    const { editingMode } = this.state;

    return editingMode
    ? (
        <FlatButton
          label="Save"
          primary
          onTouchTap={this.saveEdits}
        />
      )
    : null;
  }

  render() {
    const { article } = this.props;

    if (!article) return null;

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <div>
              <ArticleHeader>
                {this.renderTitle()}
                <List right>
                  {this.renderSaveButton()}
                  {this.renderEditButton()}
                </List>
              </ArticleHeader>
              {this.renderEditor(article.content)}
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
