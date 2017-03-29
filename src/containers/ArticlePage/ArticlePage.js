import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _find from 'lodash/find';
// LAYOUT
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
// STORE
import { loadArticles } from 'redux/modules/articlesModule';
// COMPONENTS
import RichTextEditor from 'components/RichTextEditor';

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
    return (
      <RichTextEditor
        initialState={JSON.parse(articleContent)}
        style={{ width: '100%' }}
        readOnly
      />
    );
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
                    {this.renderArticleContent(article.content)}
                  </div>}
              </Paper>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
