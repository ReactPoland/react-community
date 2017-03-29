import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
// STORE
import { loadArticles, removeArticle } from 'redux/modules/articlesModule';
// COMPONENTS
import ArticlesList from './ArticlesList';

const mappedState = ({ articles }) => ({
  articles: articles.all,
  loadingArticles: articles.loadingArticles,
  articlesLoaded: articles.articlesLoaded
});

const mappedActions = {
  loadArticles,
  removeArticle,
  pushState: push
};

@connect(mappedState, mappedActions)
export default class ArticlesPage extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    loadingArticles: PropTypes.bool.isRequired,
    articlesLoaded: PropTypes.bool.isRequired,
    loadArticles: PropTypes.func.isRequired,
    removeArticle: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (!this.props.articlesLoaded) this.props.loadArticles();
  }

  onMenuItemClick = (action) => {
    if (action.type === 'edit') this.editArticle(action.id);
    if (action.type === 'delete') this.removeArticle(action.id);
  }

  redirectToArticle = (articleId) => {
    this.props.pushState(`/articles/${articleId}`);
  }

  editArticle = (articleId) => {
    console.warn('editArticle', articleId);
  }

  removeArticle = (articleId) => {
    this.props.removeArticle(articleId);
  }

  render() {
    const { articles, loadingArticles } = this.props;
    const styles = require('./ArticlesPage.scss');

    return (
      <div className={styles.container}>
        <Grid>
          <Row>
            <Col xs={12}>
              <Paper className={styles.content} zDepth={2}>
                <h1>Articles</h1>
                {loadingArticles &&
                  <p>Loading...</p>}
                <ArticlesList
                  articles={articles}
                  onListItemClick={this.redirectToArticle}
                  onMenuItemClick={this.onMenuItemClick}
                />
              </Paper>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
