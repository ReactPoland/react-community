import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _find from 'lodash/find';
import { Html } from 'slate';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
// STORE
import { loadArticles } from 'redux/modules/articlesModule';


const mappedState = ({ articles }) => ({
  articles: articles.all,
  loadingArticles: articles.loadingArticles,
  articlesLoaded: articles.articlesLoaded
});

const mappedActions = {
  loadArticles
};

@connect(mappedState, mappedActions)
export default class ArticlePage extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    loadingArticles: PropTypes.bool.isRequired,
    articlesLoaded: PropTypes.bool.isRequired,
    loadArticles: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount() {
    if (!this.props.articlesLoaded) this.props.loadArticles();
  }

  renderArticleContent = (articleContent) => {
    const content = Html.serialize(JSON.parse(articleContent));
    console.warn('content', content);
    return content;
  }

  render() {
    const { articles, loadingArticles } = this.props;
    const styles = require('./ArticlePage.scss');
    const articleId = this.props.params.id;
    const article = _find(articles, art => articleId === `${art.id}`);

    return (
      <div className={styles.container}>
        <Grid>
          <Row>
            <Col xs={12}>
              <Paper className={styles.content} zDepth={2}>
                {loadingArticles &&
                  <p>Loading...</p>}
                {!loadingArticles && article &&
                  <div>
                    <h1>{article.title}</h1>
                    <p>{this.renderArticleContent(article.content)}</p>
                  </div>}
              </Paper>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
