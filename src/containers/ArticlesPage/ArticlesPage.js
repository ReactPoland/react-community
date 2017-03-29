import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

import { loadArticles } from 'redux/modules/articlesModule';

const mappedState = ({ articles }) => ({
  articles: articles.all,
  loadingArticles: articles.loadingArticles
});

const mappedActions = {
  loadArticles
};

@connect(mappedState, mappedActions)
export default class ArticlesPage extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    loadingArticles: PropTypes.bool.isRequired,
    loadArticles: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.loadArticles();
  }

  render() {
    const { articles, loadingArticles } = this.props;
    const styles = require('./ArticlesPage.scss');

    return (
      <div className={styles.container}>
        <Paper className={styles.content} zDepth={2}>
          <h1>Articles</h1>
          {loadingArticles &&
            <p>Loading...</p>}
          <ul>
            {articles.map(art => <li key={art.id}>{art.title}</li>)}
          </ul>
        </Paper>
      </div>
    );
  }
}
