import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _startsWith from 'lodash/startsWith';
// COMPONENTS
import ArticlesList from './ArticlesList';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from './ArticlesPage.scss';

const mappedState = ({ auth, articles }) => ({
  loggedIn: auth.loggedIn,
  articles: articles.all
});

const mappedActions = { pushState: push };

@connect(mappedState, mappedActions)
export default class ArticlesPage extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    pushState: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired
  }

  redirectToArticle = (article) => {
    if (article.type === 'external') {
      const link = _startsWith(article.link, 'http') ? article.link : 'http://' + article.link;
      window.location = link;
    } else {
      this.props.pushState(`/article/${article.id}/${article.slug}`);
    }
  }

  render() {
    const { articles, loggedIn } = this.props;

    // TODO: move to a separate component - rk
    const AddArticleButton = (
      <FloatingActionButton
        style={{
          position: 'fixed',
          right: 40,
          bottom: 40,
          zIndex: 1000
        }}
        className={styles.AddArticleButton}
        onClick={() => this.props.pushState('/articles/add')}
      >
        <ContentAdd />
      </FloatingActionButton>
    );

    return (
      <Grid style={{ position: 'relative', height: '100%' }}>
        {loggedIn && AddArticleButton}
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
