import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// COMPONENTS
import ArticlesList from './ArticlesList';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from './ArticlesPage.scss';

const mappedState = ({ articles }) => ({ articles: articles.all });

const mappedActions = { pushState: push };

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

    const AddArticleButton = (
      <FloatingActionButton
        className={styles.AddArticleButton}
        onClick={() => this.props.pushState('/articles/add')}
      >
        <ContentAdd />
      </FloatingActionButton>
    );

    return (
      <Grid style={{ position: 'relative', height: '100%' }}>
        <Row>
          <Col xs={12}>
            <h1>Articles</h1>
            <ArticlesList
              articles={articles}
              onListItemClick={this.redirectToArticle}
            />
          </Col>
        </Row>
        {AddArticleButton}
      </Grid>
    );
  }
}
