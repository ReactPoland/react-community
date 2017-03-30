import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _find from 'lodash/find';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FlatButton from 'material-ui/FlatButton';
// COMPONENTS
import RichTextEditor from 'components/RichTextEditor';
// LAYOUT
import { ArticleHeader, List } from 'components/styled';

const mappedState = ({ articles }) => ({
  articles: articles.all
});

@connect(mappedState)
export default class ArticlePage extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired
  }

  state = {
    editingMode: false,
    editedArticleContent: null
  }

  editContent = (serializedState) => {
    this.setState({ editedArticleContent: serializedState });
  }

  toggleEditMode = () => {
    this.setState({ editingMode: !this.state.editingMode });
  }

  saveEdits = () => {
    console.warn(this.state);
  }

  renderEditor = (articleContent) => {
    // editedArticle
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
        onTouchTap={this.toggleEditMode}
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
    const { articles, params } = this.props;
    const article = _find(articles, art => params.id === `${art.id}`);

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            {article &&
              <div>
                <ArticleHeader>
                  <h1 style={{ margin: 0 }}>{article.title}</h1>
                  <List right>
                    {this.renderSaveButton()}
                    {this.renderEditButton()}
                  </List>
                </ArticleHeader>
                {this.renderEditor(article.content)}
              </div>}
          </Col>
        </Row>
      </Grid>
    );
  }
}
