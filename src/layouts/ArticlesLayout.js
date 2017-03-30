import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadArticles } from 'redux/modules/articlesModule';

import { LoadingScreen } from 'components';

const mappedState = ({ articles }) => ({
  articles: articles.all,
  loadingArticles: articles.loadingArticles,
  articlesLoaded: articles.articlesLoaded
});

const mappedActions = {
  loadArticles
};

@connect(mappedState, mappedActions)
class ArticlesLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    params: PropTypes.object.isRequired,
    loadingArticles: PropTypes.bool.isRequired,
    articlesLoaded: PropTypes.bool.isRequired,
    loadArticles: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (!this.props.articlesLoaded) this.props.loadArticles();
  }

  render() {
    const styles = require('./ArticlesLayout.scss');

    return (
      <LoadingScreen loading={this.props.loadingArticles}>
        <div className={styles.ArticlesLayout}>
          {this.props.children}
        </div>
      </LoadingScreen>
    );
  }
}

export default ArticlesLayout;
