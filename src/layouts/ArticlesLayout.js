import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// STORE
import { loadArticles } from 'redux/modules/articlesModule';
// COMPONENTS
import { LoadingScreen, ErrorSnackbar, SuccessSnackbar } from 'components';

const mappedState = ({ articles }) => ({
  // Load all
  loadingArticles: articles.loadingArticles,
  articlesLoaded: articles.articlesLoaded,
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
  loadArticles
};

@connect(mappedState, mappedActions)
class ArticlesLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    params: PropTypes.object.isRequired,
    // Load all
    loadArticles: PropTypes.func.isRequired,
    loadingArticles: PropTypes.bool.isRequired,
    articlesLoaded: PropTypes.bool.isRequired,
    // Add
    articleAdded: PropTypes.number,
    addArticleError: PropTypes.string.isRequired,
    // Edit
    articleEdited: PropTypes.bool.isRequired,
    editArticleError: PropTypes.string.isRequired,
    // Remove
    articleRemoved: PropTypes.bool.isRequired,
    removeArticleError: PropTypes.string.isRequired,
  }

  state = {
    successMessage: ''
  }

  componentWillMount() {
    if (!this.props.articlesLoaded) this.props.loadArticles();
  }

  componentWillReceiveProps(nextProps) {
    // When article was successfully added...
    if (nextProps.articleAdded !== null && nextProps.articleAdded !== this.props.articleAdded) {
      this.setState({ successMessage: 'Article added' });
    }

    // When article was successfully updated...
    if (nextProps.articleEdited !== this.props.articleEdited) {
      this.setState({ successMessage: 'Article updated' });
    }

    // When article was removed...
    if (nextProps.articleRemoved === true && nextProps.articleRemoved !== this.props.articleRemoved) {
      this.setState({ successMessage: 'Article removed' });
    }
  }

  // TODO: add support form muliple messages displayed at once
  clearSuccessMessage = () => {
    this.setState({ successMessage: '' });
  }

  render() {
    const { addArticleError, editArticleError, removeArticleError } = this.props;
    const { successMessage } = this.state;
    const errorMessage = addArticleError || editArticleError || removeArticleError;
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
            open={errorMessage !== ''}
            message={errorMessage}
            // onRequestClose={this.props.clearLoadMapMarkersError}
          />
        </div>
      </LoadingScreen>
    );
  }
}

export default ArticlesLayout;
