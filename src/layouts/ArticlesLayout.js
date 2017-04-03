import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// STORE
import { loadArticles } from 'redux/modules/articlesModule';
// COMPONENTS
import { LoadingScreen, SuccessSnackbar } from 'components';

const mappedState = ({ articles, conversation }) => ({
  // ARTICLES
  // Load all
  loadingArticles: articles.loadingArticles,
  articlesLoaded: articles.articlesLoaded,
  loadArticlesError: articles.loadArticlesError,
  // Add
  articleAdded: articles.articleAdded,
  addArticleError: articles.addArticleError,
  // Edit
  articleEdited: articles.articleEdited,
  editArticleError: articles.editArticleError,
  // Remove
  articleRemoved: articles.articleRemoved,
  removeArticleError: articles.removeArticleError,
  // CONVERSATION
  loadConversationError: conversation.loadConversationError
});

const mappedActions = {
  loadArticles,
  pushState: push
};

@connect(mappedState, mappedActions)
class ArticlesLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    params: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    // ARTICLES
    loadArticles: PropTypes.func.isRequired,
    loadingArticles: PropTypes.bool.isRequired,
    articlesLoaded: PropTypes.bool.isRequired,
    articleAdded: PropTypes.number,
    articleEdited: PropTypes.bool.isRequired,
    articleRemoved: PropTypes.bool.isRequired
  }

  state = { successMessage: null }

  componentWillMount() {
    if (!this.props.articlesLoaded) this.props.loadArticles();
  }

  componentWillReceiveProps(nextProps) {
    // When article was successfully added...
    if (nextProps.articleAdded !== null && nextProps.articleAdded !== this.props.articleAdded) {
      this.setState({ successMessage: 'Article added' });
      this.props.pushState(`/article/${nextProps.articleAdded}`);
    }

    // When article was successfully updated...
    if (nextProps.articleEdited !== this.props.articleEdited) {
      this.setState({ successMessage: 'Article updated' });
    }

    // When article was removed...
    if (nextProps.articleRemoved === true && nextProps.articleRemoved !== this.props.articleRemoved) {
      this.setState({ successMessage: 'Article removed' });
      this.props.pushState('/articles');
    }
  }

  clearSuccessMessage = () => {
    this.setState({ successMessage: null });
  }

  render() {
    const { successMessage } = this.state;
    const styles = require('./ArticlesLayout.scss');

    return (
      <LoadingScreen loading={this.props.loadingArticles}>
        <div className={styles.ArticlesLayout}>
          {this.props.children}
          <SuccessSnackbar
            open={successMessage !== null}
            message={successMessage}
            onRequestClose={this.clearSuccessMessage}
          />
        </div>
      </LoadingScreen>
    );
  }
}

export default ArticlesLayout;
