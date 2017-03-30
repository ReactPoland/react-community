import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
// STORE
import { removeArticle } from 'redux/modules/articlesModule';
// COMPONENTS
import ArticlesList from './ArticlesList';

const mappedState = ({ articles }) => ({
  articles: articles.all,
});

const mappedActions = {
  removeArticle,
  pushState: push
};

@connect(mappedState, mappedActions)
export default class ArticlesPage extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    removeArticle: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  onMenuItemClick = (action) => {
    if (action.type === 'edit') this.editArticle(action.id);
    if (action.type === 'delete') this.removeArticle(action.id);
  }

  redirectToArticle = (articleId) => {
    this.props.pushState(`/article/${articleId}`);
  }

  editArticle = (articleId) => {
    console.warn('editArticle', articleId);
  }

  removeArticle = (articleId) => {
    this.props.removeArticle(articleId);
  }

  render() {
    const { articles } = this.props;

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>Articles</h1>
            <ArticlesList
              articles={articles}
              onListItemClick={this.redirectToArticle}
              onMenuItemClick={this.onMenuItemClick}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
