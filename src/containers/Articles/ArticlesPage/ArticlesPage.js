import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import permission from 'utils/privileges';
// COMPONENTS
import ArticlesList from './ArticlesList';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const mappedState = ({ auth, articles }) => ({
  loggedIn: auth.loggedIn,
  articles: articles.all,
  permissions: permission(auth.user)
});

const mappedActions = { redirect: push };

@connect(mappedState, mappedActions)
export default class ArticlesPage extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    redirect: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    permissions: PropTypes.object.isRequired
  }

  redirectToArticle = (article) => {
    this.props.redirect(`/article/${article.id}/${article.slug}`);
  }

  render() {
    const { articles, loggedIn, permissions } = this.props;

    // TODO: move to a separate component - rk
    const AddArticleButton = (
      <FloatingActionButton
        style={{
          position: 'fixed',
          right: 40,
          bottom: 40,
          zIndex: 1000
        }}
        onClick={() => this.props.redirect('/articles/add')}
      >
        <ContentAdd />
      </FloatingActionButton>
    );

    return (
      <Grid style={{ position: 'relative', height: '100%' }}>
        {loggedIn && permissions.isStaff && AddArticleButton}
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
