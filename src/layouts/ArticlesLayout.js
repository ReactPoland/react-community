import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// STORE
import {
  loadArticles, clearLoadArticlesError, clearAddArticleError,
  clearEditArticleError, clearRemoveArticleError
} from 'redux/modules/articlesModule';
// COMPONENTS
import { LoadingScreen, ErrorSnackbar, SuccessSnackbar } from 'components';

const mappedState = ({ articles }) => ({
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
  removeArticleError: articles.removeArticleError
});

const mappedActions = {
  loadArticles,
  clearLoadArticlesError,
  clearAddArticleError,
  clearEditArticleError,
  clearRemoveArticleError,
  pushState: push
};

@connect(mappedState, mappedActions)
class ArticlesLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    params: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    // Load all
    loadArticles: PropTypes.func.isRequired,
    loadingArticles: PropTypes.bool.isRequired,
    articlesLoaded: PropTypes.bool.isRequired,
    loadArticlesError: PropTypes.string.isRequired,
    clearLoadArticlesError: PropTypes.func.isRequired,
    // Add
    articleAdded: PropTypes.number,
    addArticleError: PropTypes.string.isRequired,
    clearAddArticleError: PropTypes.func.isRequired,
    // Edit
    articleEdited: PropTypes.bool.isRequired,
    editArticleError: PropTypes.string.isRequired,
    clearEditArticleError: PropTypes.func.isRequired,
    // Remove
    articleRemoved: PropTypes.bool.isRequired,
    removeArticleError: PropTypes.string.isRequired,
    clearRemoveArticleError: PropTypes.func.isRequired
  }

  state = {
    successMessage: '',
    error: {
      message: '',
      callback: null
    }
  }

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

    // ERROR HANDLING
    const errors = [
      { name: 'loadArticlesError', callback: 'clearLoadArticlesError' },
      { name: 'addArticleError', callback: 'clearAddArticleError' },
      { name: 'editArticleError', callback: 'clearEditArticleError' },
      { name: 'removeArticleError', callback: 'clearRemoveArticleError' }
    ];

    // Show error snackbar if any of the above errors is thrown
    errors.forEach(({ name, callback }) => {
      if (nextProps[name] && !this.props[name]) {
        this.setState({
          error: {
            message: nextProps[name],
            callback: this.props[callback]
          }
        });
      }
    });
  }

  // TODO: add support form muliple messages displayed at once
  clearSuccessMessage = () => {
    this.setState({ successMessage: '' });
  }

  clearErrors = () => {
    this.state.error.callback();
    this.setState({ error: { message: '', callback: null } });
  }

  render() {
    const { successMessage, error } = this.state;
    const styles = require('./ArticlesLayout.scss');

    return (
      <LoadingScreen loading={this.props.loadingArticles}>
        <div className={styles.ArticlesLayout}>
          {this.props.children}
          <SuccessSnackbar
            open={successMessage !== ''}
            message={successMessage}
            onRequestClose={this.clearSuccessMessage}
          />
          <ErrorSnackbar
            open={error.message !== ''}
            message={error.message}
            onRequestClose={this.clearErrors}
          />
        </div>
      </LoadingScreen>
    );
  }
}

export default ArticlesLayout;
