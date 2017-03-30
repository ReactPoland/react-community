import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
// COMPONENTS
import ArticlesList from './ArticlesList';

const mappedState = ({ articles }) => ({
  articles: articles.all,
});

const mappedActions = {
  pushState: push
};

@connect(mappedState, mappedActions)
export default class ArticlesPage extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    pushState: PropTypes.func.isRequired
  }

  redirectToArticle = (articleId) => {
    this.props.pushState(`/article/${articleId}`);
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
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
