import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// STORE
import { loadArticles } from 'redux/modules/articlesModule';
// COMPONENTS
import { LoadingScreen } from 'components';

const mappedState = ({ articles }) => ({
  loadingArticles: articles.loadingArticles,
  articlesLoaded: articles.articlesLoaded,
});

const mappedActions = { loadArticles };

@connect(mappedState, mappedActions)
class ArticlesContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    params: PropTypes.object.isRequired,
    loadArticles: PropTypes.func.isRequired,
    loadingArticles: PropTypes.bool.isRequired,
    articlesLoaded: PropTypes.bool.isRequired
  }

  componentWillMount() {
    if (!this.props.articlesLoaded) this.props.loadArticles();
  }

  render() {
    const styles = require('./ArticlesContainer.scss');

    return (
      <LoadingScreen loading={this.props.loadingArticles}>
        <div className={styles.ArticlesContainer}>
          {this.props.children}
        </div>
      </LoadingScreen>
    );
  }
}

export default ArticlesContainer;
